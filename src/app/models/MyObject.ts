import { MyNotification } from './MyNotification';
import { Measure } from './Measure';

export class MyObject {
    name: string;
    path: string;
    type: string;
    kind: string;
    min_threshold: Number;
    max_threshold: Number;
    measures: [Measure];
    notifications: [MyNotification];
}
