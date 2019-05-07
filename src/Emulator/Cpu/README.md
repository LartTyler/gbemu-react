<details>
<summary><strong>Click to Expand the Table of Contents</strong></summary>

- [Terms and Notes](#terms-and-notes)
- [Increment](#increment)
    - [`INC r8`](#inc-r8)
    - [`INC r16`](#inc-r16)
- [Load](#load)
	- [`LD r16, r8`](#ld-r16-r8)
	- [`LD r16, n16`](#ld-r16-n16)
- [Miscellaneous](#miscellaneous)
    - [`NOP`](#nop)
</details>

## Terms and Notes
|Term|Meaning|
|----|-------|
|`PC`|The program counter|
|`SP`|The stack pointer|
|n8|An immediate 8-bit value (the next byte in memory following the instruction)|
|n16|An immediate 16-bit value (the next 2 bytes in memory following the instruction)|
|r8|An 8-bit CPU register|
|r16|Two 8-bit CPU registers paired to contain a 16-bit value (e.g. `HL`)|
|(r16)|An address in memory pointed to by a pair of 8-bit CPU registers (e.g. `(HL)`)|

**Additional notes:**
- In the case of paired registers, the first register listed always contains the most significant bits.
- The phrase "paired registers" can also refer to the stack pointer, unless otherwise noted.
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
- **Bit 6: Half Carry (H)** indicates that the last math instruction caused an 8-bit overflow or underflow.
- **Bit 5: Subtract (N)** indicates that the last math instruction was a subtraction operation.
- **Bit 4: Zero (Z)** indicates that the result of a math operation is zero, or that two values are equal for comparison operations.

A flag is "set" if it's bit position contains a 1, is "unset" or "reset" if it's bit position contains a 0. The lower 4
bits of the flags register is not used, and should always contain zeros.

Each section below contains a table listing all similar instructions. To find a specific opcode quickly, use your
browser's search function to find `0xYZ`, where `YZ` is the hexidecimal value of the opcode you're looking for.

## Increment
### `INC r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Increments the value stored in an 8-bit register.

#### Flags
- **Zero (Z)** is set if the operation overflowed.
- **Subtract (N)** is reset.
- **Half Carry (H)** is set if the operation overflowed.

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

## Load
### `LD (r16), r8`
**Length:** 2 bytes
**Cycles (m-time):** 1

Loads the 8-bit value in `A` into the address pointed to by the register pair `(r16)`.

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

Loads an immediate 16-bit value at `(PC)` into a register pair.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x01|`LD BC, (PC)`|
|0x11|`LD DE, (PC)`|
|0x21|`LD HL, (PC)`|
|0x31|`LD SP, (PC)`|

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
