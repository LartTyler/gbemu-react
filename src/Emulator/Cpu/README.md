<details>
<summary><strong>Click to Expand the Table of Contents</strong></summary>

- [Terms and Notes](#terms-and-notes)
- [Add](#add)
    - [`ADD HL, r16`](#add-hl-r16)
- [Increment](#increment)
    - [`INC r8`](#inc-r8)
    - [`INC r16`](#inc-r16)
- [Decrement](#decrement)
    - [`DEC r8`](#dec-r8)
    - [`DEC r16`](#dec-r16)
- [Load](#load)
    - [`LD r8, n8`](#ld-r8-n8)
	- [`LD r16, r8`](#ld-r16-r8)
	- [`LD r16, n16`](#ld-r16-n16)
	- [`LD n16, SP`](#ld-n16-sp)
- [Bit Shift](#bit-shift)
    - [`RLA`](#rla)
    - [`RLCA`](#rlca)
- [Miscellaneous](#miscellaneous)
    - [`NOP`](#nop)
</details>

## Terms and Notes
|Term|Meaning|
|----|-------|
|`PC`|The program counter|
|`SP`|The stack pointer|
|`(XY)`|A register or register pair in parenthesis indicates an address reference defined by the register(s)|
|n8|An immediate 8-bit value (the next byte in memory following the instruction)|
|n16|An immediate 16-bit value (the next 2 bytes in memory following the instruction)|
|r8|An 8-bit CPU register|
|r16|Two 8-bit CPU registers paired to contain a 16-bit value (e.g. `HL`)|
|(r16)|An address in memory pointed to by a pair of 8-bit CPU registers (e.g. `(HL)`)|

**Additional notes:**
- In the case of paired registers, the first register listed always contains the most significant bits.
- The phrase "paired registers" or "register pair" can also refer to the stack pointer, unless otherwise noted.
- An address reference to `(PC)` can sometimes refer to an 8-bit value, and sometimes to a 16-bit value in memory. Refer to the instruction's docs to determine which it is.
- Where possible, descriptions are as semantic as possible.
	- The phrase `value at XYZ` refers to an address pointed to in memory by some register or pair of registers.
	- The phrase `value in XYZ` refers to a value stored in a register or pair of registers.
- When semtantics alone do not provide sufficient clarity, refer to the table above for a list of common terms and symbology.
	- Writing a register pair as `HL` always refers to the registers as a 16-bit container.
	- Writing a register pair as `(HL)` always refers to the register(s) as a 16-bit pointer to an address in memory.

**Length** refers to the number of bytes the instruction consumes. Most instructions are 1 byte, but some (such as
`0x01: LD BC, (PC)`) use the two bytes following the instruction, which advances the `PC` by a total of 3 for the
instruction.

**Cycles** refers to the [machine cycles, or m-time / m-cycles](https://en.wikipedia.org/wiki/Zilog_Z80#Instruction_execution)
that the instruction takes to execute. The CGB measures clock periods (t-cycles) as `m-time * 4`.

**Flags** refer to one of 4 flags that can be adjusted by various instructions. Each section lists which flags can
be affected by an instruction, as well as what conditions cause a flag to change. Flags that aren't listed in a section
will not be modified by the instruction, and will instead preserve their old value. Possible flags are:

- **Bit 7: Carry (C)** indicates that the last math instruction caused a 16-bit overflow or underflow, or if the `A` register is the smaller value for comparison operations.
- **Bit 6: Half Carry (H)** indicates that the last math instruction caused an 8-bit overflow.
- **Bit 5: Subtract (N)** indicates that the last math instruction was a subtraction operation.
- **Bit 4: Zero (Z)** indicates that the result of a math operation is zero, or that two values are equal for comparison operations.

A flag is "set" if it's bit position contains a 1, is "unset" or "reset" if it's bit position contains a 0. The lower 4
bits of the flags register is not used, and should always contain zeros.

Each section below contains a table listing all similar instructions. To find a specific opcode quickly, use your
browser's search function to find `0xYZ`, where `YZ` is the hexidecimal value of the opcode you're looking for.

## Add
### `ADD HL, r16`
**Length:** 1 byte
**Cycles (m-time):** 2

Adds the value in a 16-bit register to the 16-bit `HL` register pair.

#### Flags
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if the low nibble of the 8-bit `H` register overflowed. [Click here](#16-bit-carries) for a full explanation.
- **Carry (C)** is set if the high nibble of the 8-bit `H` register overflowed. [Click here](#16-bit-carries) for a full explanation.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x09|`ADD HL, BC`|
|0x19|`ADD HL, DE`|
|0x29|`ADD HL, HL`|
|0x39|`ADD HL, SP`|

## Increment
### `INC r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Increments the value stored in an 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is zero.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if the operation overflowed (i.e. the new value is 0).

#### Instructions
|Opcode|Instruction|
|---|---|
|0x04|`INC B`|
|0x0C|`INC C`|
|0x14|`INC D`|
|0x1C|`INC E`|
|0x24|`INC H`|
|0x2C|`INC L`|
|0x3C|`INC A`|

### `INC r16`
**Length:** 1 byte
**Cycles (m-time):** 2

Incremenets the value stored in a 16-bit register pair.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x03|`INC BC`|
|0x13|`INC DE`|
|0x23|`INC HL`|
|0x33|`INC SP`|

## Decrement
### `DEC r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Decrements the value stored in an 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is zero.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if the operation overflowed (i.e. the new value is 255).

#### Instructions
|Opcode|Instruction|
|---|---|
|0x05|`DEC B`|
|0x0D|`DEC C`|
|0x15|`DEC D`|
|0x1D|`DEC E`|
|0x25|`DEC H`|
|0x2D|`DEC L`|
|0x3D|`DEC A`|

### `DEC r16`
**Length:** 1 byte
**Cycles (m-time):** 2

Decrements the value stored in a 16-bit register pair.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x0B|`DEC BC`|
|0x1B|`DEC DE`|
|0x2B|`DEC HL`|
|0x3B|`DEC SP`|

## Load
### `LD r8, n8`
**Length:** 2 bytes
**Cycles (m-time):** 2

Loads an immediate 8-bit value at `(PC)` into an 8-bit register.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x06|`LD B, (PC)`|
|0x0E|`LD C, (PC)`|
|0x16|`LD D, (PC)`|
|0x1E|`LD E, (PC)`|
|0x26|`LD H, (PC)`|
|0x2E|`LD L, (PC)`|
|0x3E|`LD A, (PC)`|

### `LD (r16), r8`
**Length:** 2 bytes
**Cycles (m-time):** 1

Loads the value of an 8-bit register into the address pointed to by a 16-bit register pair.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x02|`LD (BC), A`|
|0x12|`LD (DE), A`|

### `LD r16, n16`
**Length:** 3 bytes
**Cycles (m-time):** 3

Loads an immediate 16-bit value at `(PC)` into a 16-bit register pair.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x01|`LD BC, (PC)`|
|0x11|`LD DE, (PC)`|
|0x21|`LD HL, (PC)`|
|0x31|`LD SP, (PC)`|

### `LD n16, SP`
**Length:** 3 bytes
**Cycles (m-time):** 5

Loads the 16-bit value stored in `SP` into the address pointed to by the 16-bit value at `(PC)`.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x08|`LD (PC), SP`|

## Bit Shift
### `RLCA`
**Length:** 1 byte
**Cycles (m-time):** 1

Performs a bit rotation to the left on the 8-bit register `A`. The bit leaving on the left is copied to the 
**Carry (C)** flag, and to bit 0.

```
C <- [7 <- 0] <- 7
``` 

#### Flags
- **Zero (Z)** is always reset.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is set to the value in bit 7 of `A`.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x07|`RLCA`|

### `RLA`
**Length:** 1 byte
**Cycles (m-time):** 1

Performs a bit rotation to the left on the 8-bit register `A`. The current value of the **Carry (C)** flag is copied to
bit 0, and the bit leaving on the left is copied to the **Carry (C)** flag.

```
C <- [7 <- 0] <- C
```

#### Flags
- **Zero (Z)** is always reset.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is set to the value of bit 7 in `A`.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x17|`RLA`|

## Miscellaneous
### `NOP`
**Length:** 1 byte
**Cycles (m-time):** 1

No operation performed.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x00|`NOP`|

## 16 Bit Carries
When the CPU performs 16-bit math operations (such as `ADD HL, r16`), it actually performs two 8-bit operations, first
on the low byte, then on the high byte. The flags set as a result of 16-bit operations actually come from the results
of that second operation performed on the high byte. For example, in the case of `ADD HL, r16`, the **Half Carry (H)**
flag is actually set based on whether or not the 11th bit carried into the 12th, when you consider the `r16` register
as a whole, not the 8th to 9th bit like you might expect.
