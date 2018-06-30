import { MyAction } from './MyAction';
import { Condition } from './Condition';

export class Rule {
  _id: string;
  name: string;
  description: string;
  actions: MyAction[];
  conditions: Condition[];
  state: boolean;
}
