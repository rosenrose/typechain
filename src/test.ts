const hello = () => "hi";
function hi() {
  return "hello";
}

class Hello {
  constructor(private data: string) {}
  static hi() {
    return "hi";
  }
}

const a = [1, 2, 3];
const b = [...a, 4 ** 5];
const c = 1_000_000;

// import { init, exit } from "myPackage"; // from package
// init({ url: "" });
// exit(1);

import { init2, exit2 } from "./myPackage2"; // from file
init2({ url: "" });
exit2(1);
