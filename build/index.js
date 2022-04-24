const hello = () => "hi";
function hi() {
  return "hello";
}
class Block {
  constructor(data) {
    this.data = data;
  }
  static hi() {
    return "hi";
  }
}
const a = [1, 2, 3];
const b = [...a, Math.pow(4, 5)];
const c = 1000000;
import { init, exit } from "myPackage"; // from package
init({ url: "" });
exit(1);
import { init2, exit2 } from "./myPackage2"; // from file
init2({ url: "" });
exit2(1);
