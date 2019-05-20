# Reference
- [CGB Development Wiki](http://gbdev.gg8.se/wiki/articles/Main_Page)
- [Detailed CGB Internals](http://marc.rawer.de/Gameboy/Docs/GBCPUman.pdf)
- [Repository of Useful GB Development Links](https://github.com/gbdev/awesome-gbdev)
- CPU
    - [Detailed GB Instruction Reference](https://rednex.github.io/rgbds/gbz80.7.html)<sup>[1](#instruction-inaccuracies)</sup>
    - [GB Opcode Table](http://pastraiser.com/cpu/gameboy/gameboy_opcodes.html)<sup>[1](#instruction-inaccuracies)</sup>
    - [Full Z80 Opcode Reference](http://z80-heaven.wikidot.com/opcode-reference-chart) (Actual Z80, not GB Z80)
    - [Z80 Instructions Document](http://datasheets.chipdb.org/Zilog/Z80/z80-documented-0.90.pdf) (Actual Z80, not GB Z80)
- Memory
    - [Memory Region Map](http://gameboy.mongenel.com/dmg/asmmemmap.html) (see [Memory Regions (Implementation)](#memory-regions-implementation))

# Notes
## Memory (Notes)
- Memory reads below $0100 are from the BIOS until $0100 is read. After the first read to $0100, all reads below $0100 are from the game cart instead.

# Implementation Details
## Memory Regions (Implementation)
While the [memory region map](http://gameboy.mongenel.com/dmg/asmmemmap.html) provides a good overview of how the GB
segments it's memory, the actual memory implementation combines a few sequential related regions.

|Range|Size|Name|Details|
|-----|----|-----|-------|
|`$0000 - $00FF`|255b|[Interrupt](#interrupts) vectors|&mdash;|
|`$0100 - $7FFF`|32k|Cart ROM|See [Game Cart (Implementation)](#game-cart-implementation)|
|`$8000 - $9FFF`|8k|Video Memory|Character (tile) VRAM|
|`$A000 - $BFFF`|8k|Game cart RAM|Mapped external RAM (stored on the game cart)|
|`$C000 - $DFFF`|8k|Working RAM|General purpose RAM|
|`$E000 - $FDFF`|7.5k (approx.)|Echo RAM|A [copy of](http://gbdev.gg8.se/wiki/articles/Memory_Map#Echo_RAM) the first (roughly) 7.5k of working RAM|
|`$FE00 - $FE9F`|160b|Object Attribute Memory|Sprite RAM (40 sprites, each using 4 bytes); see [Sprites (Implementation)](#sprites-implementation)|
|`$FEA0 - $FEFF`|96b|Unused|&mdash;|
|`$FF80 - $FFFE`|127b|Zero-page RAM|A small segment of fast memory|
|`$FFFF`|1b|Interrupt enable register|A special IO register that controls [interrupts](#interrupts)|

## Instructions (Implementation)
For implementation details relating to CPU instructions, [click here](src/Emulator/Cpu/README.md).

## Game Cart (Implementation)
Stub.

## Sprites (Implementation)
Stub.

## Interrupts
Interrupts consist of 3 parts.

- The [Interrupt Master Enable (IME)](#interrupt-master-enable) switch, which is stored at $FFFF in memory.
- The [Interrupt Flags (IF)](#interrupt-flags) switch, which is stored in $F0FF in memory.
- The [Interrupt Vectors](#interrupt-vectors), which are set by the programmer and are stored between $0040 and $0060 in memory.

### Interrupt Master Enable
The IME switch functions similarly to the `flags` register in the CPU. It uses the 5 lowest bits at $FFFF to indicate
which interrupts are currently enabled. Control of the IME switch is done through the following instructions.

|Instruction|Effect|
|---|---|
|`EI`|Enables all interrupts|
|`DI`|Disables all interrupts|
|`RETI`|Returns from an interrupt and re-enables interrupts (same as calling `EI` followed by `RET`|

Additionally, when an interrupt is triggered, the CPU automatically disables all interrupts until `EI` or `RETI` is
used. Normally, additional interrupts cannot be triggered while an interrupt is executing, however it's possible for a
programmer to "nest" interrupts by calling `EI` in their interrupt-handling code.

### Interrupt Flags
Interrupt flags are stored in-memory at $F0FF, and are used by the hardware to inform the CPU of pending interrupts.
Each bit of $F0FF represents a different interrupt. If the interrupt's bit is set, it is queued. During instruction
execution, the CPU checks if the `IME` register is set. If it is, any queued interrupts are executed, in ascending bit
order.

When an interrupt is executed, the following steps are taken. 

- The `IME` flag is reset, disabling all interrupts.
- The current value of `PC` is pushed onto the stack.
- A `JP` instruction jumps to the interrupt's [interrupt vector](#interrupt-vectors) (which is usually a `JP` to the interrupt handler).

A full description of each interrupt can be found in the sections below.

#### V-Blank (Interrupt)
Executes roughly 60 times per second (~59.7 on the classic Gameboy, ~61.1 on a Super Gameboy). This interrupt occurs at
the beginning of the [v-blank](#video-vblank) period, and indicates a window during which it is safe to write to video
RAM.

#### LCDC Status (Interrupt)
Used by the LCD hardware to indicate many different states of the video hardware. Most notably, used to indicate that
the video hardware is about to redraw an LCD line, and can be used to dynamically control parts of the process to
perform special video effects.

#### Timer Overflow (Interrupt)
Occurs when the `TIMA` register (at $FF05 in memory) overflows (changes from 0xFF to 0x00).

#### Serial (Interrupt)
Occurs when a serial transfer has completed on the game link port.

#### Joypad (Interrupt)
Occurs when any of the keypad input lines changes to a high or low state.

### Interrupt Vectors
An interrupt vector is a spot in memory that the CPU jumps to when an interrupt is triggered. It's up to the programmer
to set the instruction at each interrupt vector, but it usually contains a `JP` to the address in memory that acts as
the interrupt's handler.

Before an interrupt vector is called, the current value of `PC` is pushed onto the stack so that it can be restored
when the interrupt handler calls `RET` or `RETI`.  

## Instruction Inaccuracies
This document contains some inaccurcies, either in the length of certain instructions, or in how many cycles an
instruction uses. For accurate instruction information, refer to the [instructions README](src/Emulator/Cpu/README.md).
