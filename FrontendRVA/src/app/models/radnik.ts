import { Obrazovanje } from './obrazovanje';
import { Observable } from 'rxjs';
import { Sektor } from './sektor';

export class Radnik {
  id: number;
  ime: string;
  prezime: string;
  brojLk: number;
  obrazovanje: Obrazovanje;
  sektor: Sektor;
}
