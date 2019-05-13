## A Note on Tests
Many unit tests assert that `PC` doesn't change following instruction execution. Only instructions whose length is 2
bytes or more actually expect `PC` to change after execution.

This is because the CPU is responsible for moving `PC` forward once for each instruction loaded. The instruction itself
is then responsible for determining if `PC` needs to move forward as a side effect of exection (e.g. the instruction
uses an immediate 16-bit value as one of it's arguments).

Since unit tests are run on the instructions themselves, and not on the full CPU read / execute process, the fact that
the instruction is executing means that first byte that EVERY instruction occupies has already been read and `PC` has
already been incremented accordingly.
