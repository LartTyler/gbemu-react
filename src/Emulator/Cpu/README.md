## Instructions
- [Terms and Notes](#terms-and-notes)
- [Add](#add)
    - [`ADD r8, r8`](#add-r8-r8)
    - [`ADD r8, n8`](#add-r8-n8)
    - [`ADD r16, r16`](#add-r16-r16)
    - [`ADD r8, (r16)`](#add-r8-r16)
    - [`ADC r8, r8`](#adc-r8-r8)
    - [`ADC r8, (r16)`](#adc-r8-r16)
    - [`ADC r8, n8`](#adc-r8-n8)
- [Subtract](#subtract)
    - [`SUB r8, r8`](#sub-r8-r8)
    - [`SUB r8, n8`](#sub-r8-n8)
    - [`SUB r8, (r16)`](#sub-r8-r16)
    - [`SBC r8, r8`](#sbc-r8-r8)
    - [`SBC r8, (r16)`](#sbc-r8-r16)
    - [`SBC r8, n8`](#sbc-r8-n8)
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
    - [`JP (n16)`](#jp-n16)
    - [`JP cc, (n16)`](#jp-cc-n16)
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
    - [`LDH (r8), r8`](#ldh-r8-r8)
    - [`LDH (n8), r8`](#ldh-n8-r8)
- [Bitwise](#bitwise)
    - [`AND r8, r8`](#and-r8-r8)
    - [`AND r8, n8`](#and-r8-n8)
    - [`AND r8, (r16)`](#and-r8-r16)
    - [`OR r8, r8`](#or-r8-r8)
    - [`OR r8, (r16)`](#or-r8-r16)
    - [`XOR r8, r8`](#xor-r8-r8)
    - [`XOR r8, (r16)`](#xor-r8-r16)
    - [`RLA`](#rla)
    - [`RLCA`](#rlca)
    - [`RRA`](#rra)
    - [`RRCA`](#rrca)
- [Stack](#stack)
    - [`PUSH r16`](#push-r16)
    - [`PUSH AF`](#push-af)
    - [`POP r16`](#pop-r16)
    - [`POP AF`](#pop-af)
- [Subroutines](#subroutines)
    - [`CALL n16`](#call-n16)
    - [`CALL cc, n16`](#call-cc-n16)
    - [`RET`](#ret)
    - [`RET cc`](#ret-cc)
    - [`RETI`](#reti)
- [Miscellaneous](#miscellaneous)
    - [`NOP`](#nop)
    - [`STOP`](#stop)
    - [`HALT`](#halt)
    - [`DAA`](#daa)
    - [`CPL`](#cpl)
    - [`SCF`](#scf)
    - [`CCF`](#ccf)
    - [`PREFIX CB`](#prefix-cb)
- [Extended](#extended-instructions)
    - [`RLC r8`](#rlc-r8)
    - [`RL r8`](#rl-r8)
    - [`RRC r8`](#rrc-r8)

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

### `ADD r8, n8`
**Length:** 2 bytes
**Cycles (m-time):** 2

Adds an immediate 8-bit value (the byte following the instruction in memory) to an 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if bit 3 carried into bit 4. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be greater than 65535).

#### Instructions
|Opcode|Instruction
|---|---|
|0xC6|`ADD A, n8`|

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

#### Instructions
|Opcode|Instruction
|---|---|
|0x8E|`ADC A, (HL)`|

### `ADC r8, n8`
**Length:** 2 bytes
**Cycles (m-time):** 2

Adds an immediate 8-bit value (the value at `PC`) to an 8-bit register, plus 1 if the **Carry (C)** flag is set.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is set if bit 3 carried into bit 4. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be greater than 65535).

#### Instructions
|Opcode|Instruction
|---|---|
|0xCE|`ADC A, n8`|

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

### `SUB r8, n8`
**Length:** 2 bytes
**Cycles (m-time):** 2

Subtracts an immediate 8-bit value (the next byte after the instruction in memory) from an 8-bit register.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if there was a borrow from bit 4 to bit 3. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be less than 0).

#### Instructions
|Opcode|Instruction
|---|---|
|0xD6|`SUB A, n8`|

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

### `SBC r8, n8`
**Length:** 2 bytes
**Cycles (m-time):** 2

Subtracts an 8-bit value from the value in an 8-bit register, minus 1 if the **Carry (C)** flag is set.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always set.
- **Half Carry (H)** is set if there was a borrow from bit 4 to bit 3. [Click here](#half-carry-behavior) for a full explanation.
- **Carry (C)** is set if the operation overflowed (i.e. the new value would be less than 0).

#### Instructions
|Opcode|Instruction
|---|---|
|0xDE|`SBC A, n8`|

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
### `JP n16`
**Length:** 3 bytes
**Cycles (m-time):** 4

Sets `PC` to the address pointed to by the immediate 16-bit value `n16` (the current value of `PC` and `PC + 1`.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xC3|`JP n16`|

### `JP cc, n16`
**Length:** 3 bytes
**Cycles (m-time):** 3 if condition `cc` is not met, 4 if it is

Sets `PC` to the address pointed to by the immediate 16-bit value `n16` (the current value of `PC` and `PC + 1`), if the
condition `cc` is met. "Condition" is a test against the **Carry (C)** or **Zero (Z)** flags, and may be one of the
following tests.
                       
- **Z** if the **Zero (Z)** flag is set.
- **NZ** if the **Zero (Z)** flag is not set.
- **C** if the **Carry (C)** flag is set.
- **NC** if the **Carry (C)** flag is not set.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xC2|`JP NZ, (n16)`|
|0xCA|`JP Z, (n16)`|
|0xD2|`JP NC, (n16)`|
|0xDA|`JP C, (n16)`|

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

### `LDH (r8), r8`
**Length:** 1 byte
**Cycles (m-time):** 2

Loads the value in an 8-bit register into the high RAM (I/O RAM and zero page RAM) address pointed to by the value in
another 8-bit register.

Another mnemonic for this instruction is `LD ($FF00 + (r8)), r8`, since the value in the left 8-bit register is added
to `$FF00` to determine where in high RAM the value should be written (the value is treated as an offset relative to
`$FF00`).

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xE2|`LDH (r8), n8`|

### `LDH (n8), r8`
**Length:** 2 bytes
**Cycles (m-time):** 3

Loads the value in an 8-bit register `r8` into the high RAM (I/O RAM and zero page RAM) address pointed to by an
immediate 8-bit value (the value at `PC`).

Another mnemonic for this instruction is `LD ($FF00 + n8), r8`, since the value of `n8` is added to `$FF00` to determine
where in high RAM the value should be written (the value is treated as an offset relative to `$FF00`).
 
#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xE0|`LDH (n8), r8`|  

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

### `AND r8, n8`
**Length:** 2 bytes
**Cycles (m-time):** 2

Applies the bitwise AND operator to an immediate 8-bit value (the next byte after the instruction in memory) and an
8-bit register, masking off all bits that aren't set in both values. The result is stored in `r8`.

#### Flags
- **Zero (Z)** is set if the result is 0.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always set.
- **Carry (C)** is always reset.

#### Instructions
|Opcode|Instruction
|---|---|
|0xE6|`AND A, n8`|

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

## Stack
### `PUSH r16`
**Length:** 1 byte
**Cycles (m-time):** 4

Pushes the value in a 16-bit register pair onto the stack.

Additionally, as a side-effect of this instruction, `SP` is decremented by 2 (since a 16-bit value is pushed onto the
stack).

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xC5|`PUSH BC`|
|0xD5|`PUSH DE`|
|0xE5|`PUSH HL`| 

### `PUSH AF`
**Length:** 1 byte
**Cycles (m-time):** 4

Performs a [`PUSH r16`](#push-r16), except the bytes are read from the 8-bit `A` register and the flags register. The
flags register is stored as the low byte (at `SP`), and `A` is stored as the high byte (at `SP + 1`).

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xF5|`PUSH AF`|

### `POP r16`
**Length:** 1 byte
**Cycles (m-time):** 3

Pops a 16-bit value off the stack into the 16-bit register pair `r16`.

Additionally, as a side-effect of this instruction, `SP` is incremented by 2 (since a 16-bit value is popped off the
stack).

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xC1|`POP BC`|
|0xD1|`POP DE`|
|0xE1|`POP HL`|

### `POP AF`
**Length:** 1
**Cycles (m-time):** 3

Performs a [`POP r16`](#pop-r16), except the bytes are loaded into the 8-bit `A` register and the flags register. The
low byte (the byte stored at `SP`) is loaded into the flags register, and the high byte (the byte stored at `SP + 1`) is
loaded into `A`.

#### Flags
Flags are set according to the byte stored at `SP`.

#### Instructions
|Opcode|Instruction
|---|---|
|0xF1|`POP AF`|

## Subroutines
### `CALL n16`
**Length:** 3 bytes
**Cycles (m-time):** 6

Invokes a subroutine by jumping to an address pointed to by an immediate 16-bit value (the current value of `PC` and
`PC + 1`). The current value of `PC` + 2 is pushed onto the stack, allowing a subsequent call to `RET` to return
program execution back to the instruction following the `CALL` instruction.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xCD|`CALL n16`|

### `CALL cc, n16`
**Length:** 3 bytes
**Cycles (m-time):** 3 if condition `cc` is not met, 6 if it is

Performs a [`CALL n16`](#call-n16) if condition `cc` is met.  "Condition" is a test against the **Carry (C)** or
**Zero (Z)** flags, and may be one of the following tests.
                                                              
- **Z** if the **Zero (Z)** flag is set.
- **NZ** if the **Zero (Z)** flag is not set.
- **C** if the **Carry (C)** flag is set.
- **NC** if the **Carry (C)** flag is not set.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xC4|`CALL NZ, n16`|
|0xCC|`CALL Z, n16`|
|0xD4|`CALL NC, n16`|
|0xDC|`CALL C, n16`|

### `RET`
**Length:** 1 byte
**Cycles (m-time):** 4

Returns from a subroutine.

Additionally, as a side-effect of this instruction, a 16-bit value is popped off the stack, incrementing `SP` by 2.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xC9|`RET`|

### `RET cc`
**Length:** 1 byte
**Cycles (m-time):** 2 if condition `cc` is not met, 5 if it is

Returns from a subroutine if condition `cc` is met. Conditions may be one of the following tests. "Condition" is a test
against the **Carry (C)** or **Zero (Z)** flags, and may be one of the following tests.

- **Z** if the **Zero (Z)** flag is set.
- **NZ** if the **Zero (Z)** flag is not set.
- **C** if the **Carry (C)** flag is set.
- **NC** if the **Carry (C)** flag is not set.

Additionally, as a side-effect of this instruction, a 16-bit value is popped off the stack, incrementing `SP` by 2 (if
`cc` evaluated to true).

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xC0|`RET NZ`|
|0xC8|`RET Z`|
|0xD0|`RET NC`|
|0xD8|`RET C`|

### `RETI`
**Length:** 1 byte
**Cycles (m-time):** 4

Performs a normal [`RET`](#ret), but also enables interrupts. This instruction is the same as calling `EI` followed by
`RET`.

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction
|---|---|
|0xD9|`RETI`|

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

### `PREFIX CB`
**Length:** 2+ bytes
**Cycles (m-time):** 2+

This special instruction indicates that the next byte in memory represents a special extended instruction, referred to
as the `CB` instructions, due to this instruction (the prefix) having an opcode of `0xCB`. The
[Extended Instructions](#extended-instructions) section contains all of the instructions that are part of this
instruction set.

All prefixed instructions take up at least 2 bytes (one for the prefix, and one for the instruction itself), and use up
at least two cycles (m-time).

#### Flags
No flags are modified by this instruction. However, the prefixed instruction may modify flags freely.

#### Instructions
|Opcode|Instruction
|---|---|
|0xCB|`PREFIX CB`|

## Extended Instructions
### `RL r8`
Performs a bit rotation to the left on an 8-bit register. The current value of the **Carry (C)** flag is copied to bit
0, and the bit leaving on the left is copied to the **Carry (C)** flag.

```
C <- [7 <- 0] <- C
```

#### Flags
- **Zero (Z)** is always reset.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is set to the value of bit 7 in `A`.

#### Instructions
|Opcode|Instruction
|---|---|
|0xCB 0x10|`RL B`|
|0xCB 0x11|`RL C`|
|0xCB 0x12|`RL D`|
|0xCB 0x13|`RL E`|
|0xCB 0x14|`RL H`|
|0xCB 0x15|`RL L`|
|0xCB 0x17|`RL A`|

### `RLC r8`
**Length:** 2 bytes
**Cycles (m-time):** 2

Performs a bit rotation to the left on an 8-bit register. The bit leaving on the left is copied to the **Carry (C)**
flag, and to bit 0.

```
C <- [7 <- 0] <- [7]
``` 

#### Flags
- **Zero (Z)** is always reset.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is set to the value in bit 7 of `r8`.

|Opcode|Instruction
|---|---|
|0xCB 0x00|`RLC B`|
|0xCB 0x01|`RLC C`|
|0xCB 0x02|`RLC D`|
|0xCB 0x03|`RLC E`|
|0xCB 0x04|`RLC H`|
|0xCB 0x05|`RLC L`|
|0xCB 0x07|`RLC A`|

### `RRC r8`
**Length:** 1 byte
**Cycles (m-time):** 1

Performs a bit rotation to the right on an 8-bit register. The bit leaving on the right is copied to the **Carry (C)**
flag, and to bit 7.

```
[0] -> [7 -> 0] -> C
```

#### Flags
- **Zero (Z)** is always reset.
- **Subtract (N)** is always reset.
- **Half Carry (H)** is always reset.
- **Carry (C)** is set to the value of bit 0 in `A`.

#### Instructions
|Opcode|Instruction
|---|---|
|0xCB 0x08|`RRC B`|
|0xCB 0x09|`RRC C`|
|0xCB 0x0A|`RRC D`|
|0xCB 0x0B|`RRC E`|
|0xCB 0x0C|`RRC H`|
|0xCB 0x0D|`RRC L`|
|0xCB 0x0F|`RRC A`|

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
