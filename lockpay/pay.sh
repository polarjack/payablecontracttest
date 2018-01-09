#!/bin/sh

NAME="pay"

solc --abi $NAME".sol" | tail -n +4 | tr -d "\n\r" > $NAME".json"
solc --bin $NAME".sol" | tail -n +4 | tr -d "\n\r" > $NAME".bin"