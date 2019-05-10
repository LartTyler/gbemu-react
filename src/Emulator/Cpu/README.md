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
- [Jump](#jump)
    - [`JR s8`](#jr-s8)
- [Load](#load)
    - [`LD r8, n8`](#ld-r8-n8)
	- [`LD r16, r8`](#ld-r16-r8)
	- [`LD r16, n16`](#ld-r16-n16)
	- [`LD n16, SP`](#ld-n16-sp)
	- [`LDI (r16), r8`](#ldi-r16-r8)
	- [`LDI r8, (r16)`](#ldi-r8-r16)
	- [`LDD (r16), r8`](#ldd-r16-r8)
	- [`LDD r8, (r16)`](#ldd-r8-r16)
- [Bit Shift](#bit-shift)
    - [`RLA`](#rla)
    - [`RLCA`](#rlca)
    - [`RRA`](#rra)
    - [`RRCA`](#rrca)
- [Miscellaneous](#miscellaneous)
    - [`NOP`](#nop)
    - [`STOP`](#stop)
    - [`DAA`](#daa)
    - [`CPL`](#cpl)
</details>

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
### `ADD HL, r16`
**Length:** 1 byte
**Cycles (m-time):** 2

Adds the value in a 16-bit register to the 16-bit `HL` register pair.

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
- **NC** if the *Carry (C)** flag is not set.

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

## Bit Shift
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

#### Flags
No flags are modified.

#### Instructions
|Opcode|Instruction|
|---|---|
|0x10|`STOP`|

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

You can visualize it by imagining 16-bit math operations as being split into two parts: first, the operation applied to
the low bytes of the values being added, and then the operation being applied the high bytes of the same. Since the
high byte is processed last, those are the results that determine which flags are set.
