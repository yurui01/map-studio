#include <iostream>
#include <windows.h>

int main() {
    while (true) {
        std::cout << "Hello, World!";
        // sleep 1 second
        fflush(stdout);
        Sleep(1000);
    }
}