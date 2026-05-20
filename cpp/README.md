# C++ Demo Component

This directory contains a standalone C++ program that demonstrates multi-language support in the codebase.

## Files

- `hello.cpp` - Simple C++ program that prints "Hello world!"

## Compilation

To compile the program, use any C++11 compatible compiler:

```bash
# Using g++
g++ -o hello hello.cpp

# Using clang++
clang++ -o hello hello.cpp
```

## Execution

After compilation, run the executable:

```bash
./hello
```

Expected output:
```
Hello world!
```

## Requirements

- C++11 compatible compiler (g++, clang++, etc.)
- Standard C++ library

## Notes

- This component is isolated from the Node.js service
- No integration with Express routes or deployment pipeline
- Compilation time should be under 5 seconds
- Program returns exit code 0 on successful execution