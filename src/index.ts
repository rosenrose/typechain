const hello = () => "hi";
function hi() {
  return "hello";
}

class Block {
  constructor(private data: string) {}
  static hi() {
    return "hi";
  }
}

const a = [1, 2, 3];
const b = [...a, 4 ** 5];
const c = 1_000_000;

import { init, exit } from "myPackage"; // from package
// import { init, exit } from "./myPackage";  // from file
init({ url: "" });
exit(1);
