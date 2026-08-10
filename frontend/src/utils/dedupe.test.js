import { describe, it, expect } from 'vitest';
import { dedupeWorkouts } from './dedupe';

describe('dedupeWorkouts', () => {
  it('removes duplicate workouts by name+day', () => {
    const input = [
      { id: 1, name: 'A', day: 'SEG' },
      { id: 2, name: 'A', day: 'SEG' },
      { id: 3, name: 'B', day: 'TER' },
    ];
    const out = dedupeWorkouts(input);
    expect(out.length).toBe(2);
    expect(out.find(w => w.id === 1)).toBeDefined();
    expect(out.find(w => w.id === 2)).toBeUndefined();
  });
});
