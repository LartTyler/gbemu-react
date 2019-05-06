# Reference
- [Gameboy Classic Development Wiki](http://gbdev.gg8.se/wiki/articles/Main_Page)
- CPU
    - [Detailed GB Classic Opcode Reference](https://rednex.github.io/rgbds/gbz80.7.html)
    - [GB Classic Opcode Table](http://pastraiser.com/cpu/gameboy/gameboy_opcodes.html)
    - [Full Z80 Opcode Reference](http://z80-heaven.wikidot.com/opcode-reference-chart)
- Memory
    - [Memory Region Map](http://gameboy.mongenel.com/dmg/asmmemmap.html) (see [Memory Regions (Implementation)](#memory-regions-implementation))

# Notes
## Memory (Notes)
- Memory reads are from the BIOS until 0x100 is read, after which point all reads are from the game cart.

# Implementation Details
## Memory Regions (Implementation)
While the [memory region map](http://gameboy.mongenel.com/dmg/asmmemmap.html) provides a good overview of how the GB
segments it's memory, the actual memory implementation combines a few sequential related regions.

|Range|Size|Name|Details|
|-----|----|-----|-------|
|`$0000 - $00FF`|255b|Interrupt vectors|&mdash;|
|`$0100 - $7FFF`|32k|Cart ROM|See [Game Cart (Implementation)](#game-cart-implementation)|
|`$8000 - $9FFF`|8k|Video Memory|Character (tile) VRAM|
|`$A000 - $BFFF`|8k|Game cart RAM|Mapped external RAM (stored on the game cart)|
|`$C000 - $DFFF`|8k|Working RAM|General purpose RAM|
|`$E000 - $FDFF`|7.5k (approx.)|Echo RAM|A [copy of](http://gbdev.gg8.se/wiki/articles/Memory_Map#Echo_RAM) the first (roughly) 7.5k of working RAM|
|`$FE00 - $FE9F`|160b|Object Attribute Memory|Sprite RAM (40 sprites, each using 4 bytes); see [Sprites (Implementation)](#sprites-implementation)|
|`$FEA0 - $FEFF`|96b|Unused|&mdash;|
|`$FF80 - $FFFE`|127b|Zero-page RAM|A small segment of fast memory|
|`$FFFF`|1b|Interrupt enable register|A special IO register that controls interrupts|


## Game Cart (Implementation)
Stub.

## Sprites (Implementation)
Stub.
