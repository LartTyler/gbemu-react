## Instructions
- [Terms and Notes](#terms-and-notes)
- [Add](#add)
    - [`ADD r8, r8`](#add-r8-r8)
    - [`ADD r16, r16`](#add-r16-r16)
    - [`ADD r8, (r16)`](#add-r8-r16)
    - [`ADC r8, r8`](#adc-r8-r8)
    - [`ADC r8, (r16)`](#adc-r8-r16)
- [Subtract](#subtract)
    - [`SUB r8, r8`](#sub-r8-r8)
    - [`SUB r8, (r16)`](#sub-r8-r16)
    - [`SBC r8, r8`](#sbc-r8-r8)
    - [`SBC r8, (r16)`](#sbc-r8-r16)
    - [`CP r8, r8`](#cp-r8-r8)
    - [`CP r8, (r16)`](#cp-r8-r16)
- [Increment](#increment)
    - [`INC r8`](#inc-r8)
    - [`INC r16`](#inc-r16)
    - [`INC (r16)` (Address)](#inc-r16-address)
- [Decrement](#decrement)
    - [`DEC r8`](#dec-r8)
    - [`DEC r16`](#dec-r16)
    - [`DEC (r16)` (Address)](#dec-r16-address)
- [Jump](#jump)
    - [`JR s8`](#jr-s8)
    - [`JR cc, s8`](#jr-cc-s8)
- [Load](#load)
    - [`LD r8, n8`](#ld-r8-n8)
    - [`LD r8, (r16)`](#ld-r8-r16)
    - [`LD r8, r8`](#ld-r8-r8)
    - [`LD (r16), r8`](#ld-r16-r8)
    - [`LD r16, n16`](#ld-r16-n16)
    - [`LD n16, SP`](#ld-n16-sp)
    - [`LD (r16), n8`](#ld-r16-n8)
    - [`LDI (r16), r8`](#ldi-r16-r8)
    - [`LDI r8, (r16)`](#ldi-r8-r16)
    - [`LDD (r16), r8`](#ldd-r16-r8)
    - [`LDD r8, (r16)`](#ldd-r8-r16)
- [Bitwise](#bitwise)
    - [`AND r8, r8`](#and-r8-r8)
    - [`AND r8, (r16)`](#and-r8-r16)
    - [`OR r8, r8`](#or-r8-r8)
    - [`OR r8, (r16)`](#or-r8-r16)
    - [`XOR r8, r8`](#xor-r8-r8)
    - [`XOR r8, (r16)`](#xor-r8-r16)
    - [`RLA`](#rla)
    - [`RLCA`](#rlca)
    - [`RRA`](#rra)
    - [`RRCA`](#rrca)
- [Subroutines](#subroutines)
    - [`RET cc`](#ret-cc)
- [Miscellaneous](#miscellaneous)
    - [`NOP`](#nop)
    - [`STOP`](#stop)
    - [`HALT`](#halt)
    - [`DAA`](#daa)
    - [`CPL`](#cpl)
    - [`SCF`](#scf)
    - [`CCF`](#ccf)

## Terms and Notes
|Term|Meaning|
|----|-------|
|`PC`|The program counter|
|`SP`|The stack pointer|
|`(XY)`|A register or register pair in parenthesis indicates an address reference defined by the register(s)|
|n8|An immediate 8-bit value (the next byte in memory following the instruction)|
|n16|An immediate 16-bit value (the next 2 bytes in memory following the instruction)|
|s8|An immediate 8-bit signed value (the next byte in memory following the instruction, treated as a signed integer)|
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
- When semantics alone do not provide sufficient clarity, refer to the table above for a list of common terms and symbology.
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
- **Bit 6: Half Carry (H)** indicates that the last math instruction caused the low nibble of an 8-bit value to overflow. [Click here](#half-carry-behavior) for a more detailed explanation.
- **Bit 5: Subtract (N)** indicates that the last math instruction was a subtraction operation.
- **Bit 4: Zero (Z)** indicates that the result of a math operation is zero, or that two values are equal for comparison operations.

A flag is "set" if it's bit position contains a 1, is "unset" or "reset" if it's bit position contains a 0. The lower 4
bits of the flags register is not used, and should always contain zeros.

Each section below contains a table listing all similar instructions. To find a specific opcode quickly, use your
browser's search function to find `0xYZ`, where `YZ` is the hexidecimal value of the opcode you're looking for.

## Add
### `ADD r8, r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Adds the value in an 8-bit register to the value in another 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if bit 3 carried into bit 4. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be greater than 65535).

#### Instructions
|Opcode|Instruction
|---|---|
|0x80|`ADD A, B`|
|0x81|`ADD A, C`|
|0x82|`ADD A, D`|
|0x83|`ADD A, E`|
|0x84|`ADD A, H`|
|0x85|`ADD A, L`|
|0x87|`ADD A, A`|

### `ADD r16, r16`
**Length:** 1 byte
**Cycles (m-time):** 2

Adds the value in a 16-bit register pair to another 16-bit register pair.

#### Flags
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if bit 11 carried into bit 12. [Click here](#16-bit-half-carries) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be greater than 65535).

#### Instructions
|Opcode|Instruction|
|---|---|
|0x09|`ADD HL, BC`|
|0x19|`ADD HL, DE`|
|0x29|`ADD HL, HL`|
|0x39|`ADD HL, SP`|

### `ADD r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Adds the byte pointed to by a 16-bit register pair to an 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if bit 3 carried into bit 4. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be greater than 65535).

#### Instructions
|Opcode|Instruction
|---|---|
|0x86|`ADD A, (HL)`|

### `ADC r8, r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Adds the value in an 8-bit register to the value in another 8-bit register, plus 1 if the **Carry (C)** flag is set.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if bit 3 carried into bit 4. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be greater than 65535).

#### Instructions
|Opcode|Instruction
|---|---|
|0x88|`ADC A, B`|
|0x89|`ADC A, C`|
|0x8A|`ADC A, D`|
|0x8B|`ADC A, E`|
|0x8C|`ADC A, H`|
|0x8D|`ADC A, L`|
|0x8F|`ADC A, A`|

### `ADC r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Adds the value pointed to by a 16-bit register to an 8-bit register, plus 1 if the **Carry (C)** flag is set.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if bit 3 carried into bit 4. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be greater than 65535).

## Subtract
### `SUB r8, r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Subtracts the value in an 8-bit register from the value in another 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if there was a borrow from bit 4 to bit 3. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be less than 0).

#### Instructions
|Opcode|Instruction
|---|---|
|0x90|`SUB A, B`|
|0x91|`SUB A, C`|
|0x92|`SUB A, D`|
|0x93|`SUB A, E`|
|0x94|`SUB A, H`|
|0x95|`SUB A, L`|
|0x97|`SUB A, A`|

### `SUB r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Subtracts the byte pointed to by a 16-bit register pair from the value in an 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if there was a borrow from bit 4 to bit 3. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be less than 0).

#### Instructions
|Opcode|Instruction
|---|---|
|0x96|`SUB A, (HL)`|

### `SBC r8, r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Subtracts the value in an 8-bit register from the value in another 8-bit register, minus 1 if the **Carry (C)** flag is
set.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if there was a borrow from bit 4 to bit 3. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be less than 0).

#### Instructions
|Opcode|Instruction
|---|---|
|0x98|`SBC A, B`|
|0x99|`SBC A, C`|
|0x9A|`SBC A, D`|
|0x9B|`SBC A, E`|
|0x9C|`SBC A, H`|
|0x9D|`SBC A, L`|
|0x9F|`SBC A, A`|

### `SBC r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Subtracts the byte pointed to by a 16-bit register pair `(r16)` from the value in an 8-bit register, minus 1 if the
**Carry (C)** flag is set.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if there was a borrow from bit 4 to bit 3. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be less than 0).

#### Instructions
|Opcode|Instruction
|---|---|
|0x9E|`SBC A, (HL)`|

### `CP r8, r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Compares the values in two 8-bit registers by subtracting them and setting the appropriate flags (as in
[`SUB r8, r8`](#sub-r8-r8)), but does not store the result or change any registers aside from the flags register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if there was a borrow from bit 4 to bit 3. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be less than 0).

#### Instructions
|Opcode|Instruction
|---|---|
|0xB8|`CP A, B`|
|0xB9|`CP A, C`|
|0xBA|`CP A, D`|
|0xBB|`CP A, E`|
|0xBC|`CP A, H`|
|0xBD|`CP A, L`|
|0xBF|`CP A, A`|

### `CP r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Compares the value in an 8-bit register with the byte pointed to by a 16-bit register pair by subtracting them and
setting the appropriarte flags (as in [`SUB r8, (r16)`](#sub-r8-r16)), but does not store the result or change any
registers aside from the flags register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if there was a borrow from bit 4 to bit 3. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be less than 0).

#### Instructions
|Opcode|Instruction
|---|---|
|0xBE|`CP A, (HL)`|

## Increment
### `INC r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Increments the value stored in an 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is zero.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if bit 3 carried into bit 4. [Click here](#half-carry-behavior) for a full explanation.

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

### `INC (r16)` (Address)
**Length:** 1 byte
**Cycles (m-time):** 3

Increments the value pointed to by a 16-bit register pair.

#### Flags
- **Zero (Z)** is set if the result is zero.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if bit 3 carried into bit 4. [Click here](#half-carry-behavior) for a full explanation.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x34|`INC (HL)`|

## Decrement
### `DEC r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Decrements the value stored in an 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is zero.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if the there was a borrow from bit 4 to bit 3 during the operation. [Click here](#half-carry-behavior) for a full explanation.

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

### `DEC (r16)` (Address)
**Length:** 1
**Cycles (m-time):** 3

Decrements the value pointed to by a 16-bit register pair.

#### Flags
- **Zero (Z)** is set if the result is zero.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if the there was a borrow from bit 4 to bit 3 during the operation. [Click here](#half-carry-behavior) for a full explanation.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x35|`DEC (HL)`|

## Jump
### `JR s8`
**Length:** 2 bytes
**Cycles (m-time):** 3

Makes a relative jump (adds a value to `PC`) using a signed immediate 8-bit value.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x18|`JR s8`|

### `JR cc, s8`
**Length:** 2 bytes
**Cycles (m-time):** 2 if condition `cc` is not met, 3 if it is

Makes a relative jump (adds a value to `PC`) using a signed immediate 8-bit value, if condition `cc` is met. "Condition"
is a test against the **Carry (C)** or **Zero (Z)** flags, and may be one of the following tests.

- **Z** if the **Zero (Z)** flag is set.
- **NZ** if the **Zero (Z)** flag is not set.
- **C** if the **Carry (C)** flag is set.
- **NC** if the **Carry (C)** flag is not set.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x20|`JR NZ, s8`|
|0x28|`JR Z, s8`|
|0x30|`JR NC, s8`|
|0x38|`JR C, s8`|

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

### `LD r8, r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Loads an 8-bit register (right side) into another 8-bit register (left side).

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|Opcode|Instruction|
|---|---|---|---|
|0x40|`LD B, B`|0x48|`LD C, B`|
|0x41|`LD B, C`|0x49|`LD C, C`|
|0x42|`LD B, D`|0x4A|`LD C, D`|
|0x43|`LD B, E`|0x4B|`LD C, E`|
|0x44|`LD B, H`|0x4C|`LD C, H`|
|0x45|`LD B, L`|0x4D|`LD C, L`|
|0x47|`LD B, A`|0x4F|`LD C, A`|
|0x50|`LD D, B`|0x58|`LD E, B`|
|0x51|`LD D, C`|0x59|`LD E, C`|
|0x52|`LD D, D`|0x5A|`LD E, D`|
|0x53|`LD D, E`|0x5B|`LD E, E`|
|0x54|`LD D, H`|0x5C|`LD E, H`|
|0x55|`LD D, L`|0x5D|`LD E, L`|
|0x57|`LD D, A`|0x5F|`LD E, A`|
|0x60|`LD H, B`|0x68|`LD L, B`|
|0x61|`LD H, C`|0x69|`LD L, C`|
|0x62|`LD H, D`|0x6A|`LD L, D`|
|0x63|`LD H, E`|0x6B|`LD L, E`|
|0x64|`LD H, H`|0x6C|`LD L, H`|
|0x65|`LD H, L`|0x6D|`LD L, L`|
|0x67|`LD H, A`|0x6F|`LD L, A`|
|||0x78|`LD A, B`|
|||0x79|`LD A, C`|
|||0x7A|`LD A, D`|
|||0x7B|`LD A, E`|
|||0x7C|`LD A, H`|
|||0x7D|`LD A, L`|
|||0x7F|`LD A, A`|


### `LD r8, (r16)`
**Length:** 1 bytes
**Cycles (m-time):** 2

Loads the value pointed to by a 16-bit register pair into an 8-bit register.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x0A|`LD A, (BC)`|
|0x1A|`LD A, (DE)`|
|0x46|`LD B, (HL)`|
|0x4E|`LD C, (HL)`|
|0x56|`LD D, (HL)`|
|0x5E|`LD E, (HL)`|
|0x66|`LD H, (HL)`|
|0x6E|`LD L, (HL)`|
|0x7E|`LD A, (HL)`|


### `LD (r16), r8`
**Length:** 1 bytes
**Cycles (m-time):** 2

Loads the value of an 8-bit register into the address pointed to by a 16-bit register pair.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x02|`LD (BC), A`|
|0x12|`LD (DE), A`|
|0x70|`LD (HL), B`|
|0x71|`LD (HL), C`|
|0x72|`LD (HL), D`|
|0x73|`LD (HL), E`|
|0x74|`LD (HL), H`|
|0x75|`LD (HL), L`|
|0x77|`LD (HL), A`|

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

### `LD (r16), n8`
**Length:** 2 bytes
**Cycles (m-time):** 3

Loads an immediate 8-bit value into the address pointed to by the 16-bit register pair `(r16)`.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x36|`LD (HL), n8`|

### `LDI (r16), r8`
**Length:** 1 byte
**Cycles (m-time):** 2

Loads the 8-bit value stored in `r8` into the address pointed to by the 16-bit value in `(r16)`, then post-increments
the 16-bit register pair `r16`.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x22|`LDI (HL), A`|

### `LDI r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Loads the 8-bit value stored at the address pointed to by the 16-bit register `(r16)` into the 8-bit register `r8`, then
post-increments the 16-bit register pair `r16`.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x2A|`LDI A, (HL)`|

### `LDD (r16), r8`
**Length:** 1 byte
**Cycles (m-time):** 2

Loads the 8-bit value stored in `r8` into the address pointed to by the 16-bit value in `(r16)`, then post-decrements
the 16-bit register pair `r16`.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x32|`LDD (HL), A`|

### `LDD r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Loads the 8-bit value stored at the address pointed to by the 16-bit register `(r16)` into the 8-bit register `r8`, then
post-decrements the 16-bit register pair `r16`.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x3A|`LDD A, (HL)`|

## Bitwise
### `AND r8, r8`
**Length:** 1 byte
**Cycles:** 1

Applies the bitwise AND operator to two 8-bit registers, masking off all bits that aren't set in both registers. The
result is stored in the 8-bit register on the left.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always set.
- **Carry (C)** is always reset.

#### Instructions
|Opcode|Instruction
|---|---|
|0xA0|`AND A, B`|
|0xA1|`AND A, C`|
|0xA2|`AND A, D`|
|0xA3|`AND A, E`|
|0xA4|`AND A, H`|
|0xA5|`AND A, L`|
|0xA7|`AND A, A`|

### `AND r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Applies the bitwise AND operator to an 8-bit register and the byte at the address pointed to by a 16-bit register pair,
masking off all bits that aren't set in both values. The result is stored in `r8`.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always set.
- **Carry (C)** is always reset.

#### Instructions
|Opcode|Instruction
|---|---|
|0xA6|`AND A, (HL)`|

### `OR r8, r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Applies the bitwise OR operator to two 8-bit registers, masking on all bits that are set in either register. The result
is stored in the left register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is always reset.

#### Instructions
|Opcode|Instruction
|---|---|
|0xB0|`OR A, B`|
|0xB1|`OR A, C`|
|0xB2|`OR A, D`|
|0xB3|`OR A, E`|
|0xB4|`OR A, H`|
|0xB5|`OR A, L`|
|0xB7|`OR A, A`|

### `OR r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Applies the bitwise OR operator to an 8-bit register and the byte pointed to by a 16-bit register pair, masking on all
bits that are set in both values. The result in stored in `r8`.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is always reset.

#### Instructions
|Opcode|Instruction
|---|---|
|0xB6|`OR A, (HL)`|

### `XOR r8, r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Applies the bitwise XOR operation to two 8-bit registers, masking off all bits that are set in both registers. The
result is stored in the left register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is always reset.

#### Instructions
|Opcode|Instruction
|---|---|
|0xA8|`XOR A, B`|
|0xA9|`XOR A, C`|
|0xAA|`XOR A, D`|
|0xAB|`XOR A, E`|
|0xAC|`XOR A, H`|
|0xAD|`XOR A, L`|
|0xAF|`XOR A, A`|

### `XOR r8, (r16)`
**Length:** 1 byte
**Cycles (m-time):** 2

Applies the bitwise XOR operation to an 8-bit register and the byte at the address pointed to by a 16-bit register pair,
masking off all bits that are set in both values. The result is stored in `r8`.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is always reset.

#### Instructions
|Opcode|Instruction
|---|---|
|0xAE|`XOR A, (HL)`|

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

### `RLCA`
**Length:** 1 byte
**Cycles (m-time):** 1

Performs a bit rotation to the left on the 8-bit register `A`. The bit leaving on the left is copied to the 
**Carry (C)** flag, and to bit 0.

```
C <- [7 <- 0] <- [7]
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

### `RRA`
**Length:** 1 byte
**Cycles (m-time):** 1

Performs a bit rotation to the right on the 8-bit register `A`. The current value of the **Carry (C)** flag is copied to
bit 7, and the bit leaving on the right is copied to the **Carry (C)** flag.

```
C -> [7 -> 0] -> C
```

#### Flags
- **Zero (Z)** is always reset.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is set to the value of bit 0 in `A`.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x1F|`RRA`|

### `RRCA`
**Length:** 1 byte
**Cycles (m-time):** 1

Performs a bit rotation to the right on the 8-bit register `A`. The bit leaving on the right is copied to the
**Carry (C)** flag, and to bit 7.

```
[0] -> [7 -> 0] -> C
```

#### Flags
- **Zero (Z)** is always reset.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is set to the value of bit 0 in `A`.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x0F|`RRCA`|

## Subroutines
### `RET cc`
**Length:** 1 byte
**Cycles (m-time):** 2 if condition `cc` is not met, 5 if it is

Returns from a subroutine if condition `cc` is met. Conditions may be one of the following tests. "Condition" is a test
against the **Carry (C)** or **Zero (Z)** flags, and may be one of the following tests.

- **Z** if the **Zero (Z)** flag is set.
- **NZ** if the **Zero (Z)** flag is not set.
- **C** if the **Carry (C)** flag is set.
- **NC** if the **Carry (C)** flag is not set.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xC0|`RET NZ`|
|0xC8|`RET Z`|
|0xD0|`RET NC`|
|0xD8|`RET C`|

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

### `STOP`
**Length:** 2 bytes
**Cycles (m-time):** 1

Stops CPU execution.

Technically, this isn't how this instruction is supposed to behave, but for now `STOP` is the same as [`HALT`](#halt),
except it has a length of 2 bytes.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x10|`STOP`|

### `HALT`
**Length:** 1 byte
**Cycles (m-time):** 0

Stops CPU execution. 

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0x76|`HALT`|

### `DAA`
**Length:** 1 byte
**Cycles (m-time):** 1

Corrects the 8-bit value in register `A` so that it's properly encoded as a [binary-coded decimal](https://en.wikipedia.org/wiki/Binary-coded_decimal).
This instruction is intended for use following add / subtract instructions, and uses the flags set by those instructions
to determine how the value in `A` needs to be adjusted.

If the previous operation was an add (**Subtract (N)** flag is unset), `DAA` takes the following actions.

- If the **Carry (C)** flag is set, or if `A > 0x99` (the largest possible 8-bit BCD value), add 0x60 (+6 to high nibble).
- If the **Half Carry (H)** flag is set, of if `(A & 0x0F) > 0x09` (the largest possible BCD value for a nibble), add 0x6 (+6 to low nibble).

If the previous operation was a subtract (**Subtract (N)** flag is set), `DAA` takes the following actions.

- If the **Carry (C)** flag is set, subtract 0x60 (-6 from high nibble).
- If the **Half Carry (H)** flag is set, subtract 0x6 (-6 from low nibble).

#### Flags
- **Zero (Z)** is set if the result is zero.
- **Half Carry (H)** is always reset.
- **Carry (C)** is set if 6 was added to or subtracted from the high nibble (i.e. if the respective **Carry (C)** condition was triggered).

#### Instructions
|Opcode|Instruction|
|---|---|
|0x27|`DAA`|

### `CPL`
**Length:** 1 byte
**Cycles (m-time):** 1

Inverts the bits in the 8-bit `A` register (i.e. the bitwise expression `~A`).

#### Flags
- **Subtract (N)** is always set.
- **Half Carry (H)** is always set.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x2F|`CPL`|

### `SCF`
**Length:** 1 byte
**Cycles (m-time):** 1

Sets the carry flag.

#### Flags
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is always set.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x37|`SCF`|

### `CCF`
**Length:** 1 byte
**Cycles (m-time):** 1

Inverts the **Carry (C)** flag bit.

#### Flags
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is inverted (it's set if it wasn't set, and unset if it was).

#### Instructions
|Opcode|Instruction|
|---|---|
|0x3F|`CCF`|

## Half Carry Behavior
A half carry occurs when a math instruction causes the lower nibble of an 8-bit register to either:

- Overflow from bit 3 to bit 4, in the case of addition instructions
- Overflow from bit 4 to bit 3, in the case of subtraction instructions.

For **addition**, the formula for detecting a half carry looks something like this.

```
(a & 0xF) + (b & 0xF) & 0x10
```

If the result is non-zero, a half carry occurred. Basically, if adding the low nibble of a and b together cause bit 4 to
be set (`0x10`), then the operation results in a half carry.

For **subtraction**, the formula for detecting a half carry looks something like this.

```
(a & 0xF) - (b & 0xF)
``` 

If the result is less than zero, a half carry occurred. Basically, if the low nibble of a is less than that of b, then
the operation results in a half carry.

### 16-Bit Half Carries
16-bit half carries work differently than 8-bit half carries. Instead of operating on the low nibble of a 16-bit value,
they actually operate on the low nibble of the high byte of the 16-bit value.

You can visualize it by imagining 16-bit math operations as being split into two parts: first, the operation is applied
to the low byte of the values being added, and then the operation is applied to the high byte of the same. Since the
high byte is processed last, those are the results that determine which flags are set.
