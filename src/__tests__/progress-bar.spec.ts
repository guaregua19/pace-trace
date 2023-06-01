import PaceTrace from "../progress-bar";

describe('PaceTrace', () => {
  it('Should initialize correctly with default values', () => {
    const progress = new PaceTrace(100);
    expect(progress).toBeDefined();
    // Continue with checks for default values
  });

  it('Should increment progress correctly', () => {
    const progress = new PaceTrace(100);
    progress.increment();
    const output = progress.display();
    expect(output).toContain('1'); // Assuming percentage is displayed
  });

  it('Should not exceed total when incrementing', () => {
    const progress = new PaceTrace(100);
    progress.increment(101);
    const output = progress.display();
    expect(output).toContain('100'); // Assuming percentage is displayed
  });

  it('Should decrement progress correctly', () => {
    const progress = new PaceTrace(100);
    progress.increment(50);
    progress.decrement();
    const output = progress.display();
    expect(output).toContain('49'); // Assuming percentage is displayed
  });

  it('Should not go below 0 when decrementing', () => {
    const progress = new PaceTrace(100);
    progress.decrement(101);
    const output = progress.display();
    expect(output).toContain('0'); // Assuming percentage is displayed
  });

  it('Should hide percentage if showPercentage is false', () => {
    const progress = new PaceTrace(100, { showPercentage: false });
    progress.increment(50);
    const output = progress.display();
    expect(output).not.toContain('%');
  });

  it('Should display correct character for bar style', () => {
    const progress = new PaceTrace(100, { barStyle: 'star' });
    progress.increment(50);
    const output = progress.display();
    expect(output).toContain('★'); // Assuming star is displayed for the bar
  });

  it('Should align progress bar correctly', () => {
    const progress = new PaceTrace(100, { align: 'right' });
    progress.increment(50);
    const output = progress.display();
    // This expectation might be more complex depending on how you decide to test alignment
    expect(output.trim()).toBe(output);
  });

  it('Should not throw an error when total progress is 0', () => {
    expect(() => new PaceTrace(0)).not.toThrow();
  });

  it('Should not throw an error when total progress is negative', () => {
    expect(() => new PaceTrace(-1)).not.toThrow();
  });
});
