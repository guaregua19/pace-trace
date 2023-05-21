import chalk from 'chalk';
import readline from 'readline';

interface PaceTraceOptions {
  barSize?: number;
  align?: 'left' | 'right' | 'center';
  barStyle?: string;
  showPercentage?: boolean;
  format?: string;
  stopOnComplete?: boolean;
  clearOnComplete?: boolean;
  hideCursor?: boolean;
}

class PaceTrace {
  private current: number;
  private total: number;
  private barSize: number;
  private align: 'left' | 'right' | 'center';
  private barStyle: string;
  private showPercentage: boolean;
  private format: string;
  private stopOnComplete: boolean;
  private clearOnComplete: boolean;
  private hideCursor: boolean;

  constructor(total: number, options?: PaceTraceOptions) {
    this.total = total;
    this.current = 0;
    this.barSize = options?.barSize || 40;
    this.align = options?.align || 'left';
    this.barStyle = options?.barStyle || 'bar';
    this.showPercentage = options?.showPercentage ?? true;
    this.format = options?.format || 'progress [{bar}] {percentage}%';
    this.stopOnComplete = options?.stopOnComplete || false;
    this.clearOnComplete = options?.clearOnComplete || false;
    this.hideCursor = options?.hideCursor || false;

    if (this.hideCursor) {
      this.hideConsoleCursor();
    }
  }

  increment(incrementBy: number = 1): void {
    const newProgress = this.current + incrementBy;
    this.current = Math.min(newProgress, this.total);

    if (this.current === this.total && this.stopOnComplete) {
      this.stop();
    }
  }

  decrement(decrementBy: number = 1): void {
    const newProgress = this.current - decrementBy;
    this.current = Math.max(newProgress, 0);
  }

  display(): string {
    const progress = Math.round((this.current / this.total) * this.barSize);
    const filledBar = this.getBarStyle(progress);
    const emptyBar = this.getBarStyle(this.barSize - progress, true);
    const progressBar = chalk.green(filledBar) + chalk.gray(emptyBar);
    const percentage = Math.round((this.current / this.total) * 100);
  
    let output = this.format
      .replace('{bar}', progressBar)
      .replace('{percentage}', this.showPercentage ? String(percentage) : '')
      .replace('{value}', String(this.current))
      .replace('{total}', String(this.total));
  
    // Remove trailing '%' if showPercentage is false
    if (!this.showPercentage) {
      output = output.replace('%', '');
    }
  
    output = this.alignProgressBar(output);
  
    console.log(output);
  
    return output;
  }
  

  stop(): void {
    if (this.clearOnComplete) {
      this.clear();
    }
    if (this.hideCursor) {
      this.showConsoleCursor();
    }
  }

  clear(): void {
    console.clear();
  }

  private getBarStyle(length: number, empty: boolean = false): string {
    let char: string;
    switch (this.barStyle) {
      case 'bar':
        char = empty ? ' ' : '=';
        break;
      case 'braille':
        char = '⣿';
        break;
      case 'block':
        char = '█';
        break;
      case 'star':
        char = '★';
        break;
      case 'heart':
        char = '♥';
        break;
      default:
        char = '#';
        break;
    }
    return char.repeat(length);
  }

  private alignProgressBar(output: string): string {
    const paddingSize = Math.max(0, this.barSize - output.length);
    const padding = ' '.repeat(paddingSize);

    switch (this.align) {
      case 'right':
        return padding + output;
      case 'center':
        const leftPaddingSize = Math.floor(paddingSize / 2);
        const rightPaddingSize = Math.ceil(paddingSize / 2);
        const leftPadding = ' '.repeat(leftPaddingSize);
        const rightPadding = ' '.repeat(rightPaddingSize);
        return leftPadding + output + rightPadding;
      case 'left':
      default:
        return output + padding;
    }
  }

  private hideConsoleCursor(): void {
    if (process.stdout.isTTY) {
      readline.cursorTo(process.stdout, 0, 0);
      readline.clearScreenDown(process.stdout);
    }
  }

  private showConsoleCursor(): void {
    if (process.stdout.isTTY) {
      readline.cursorTo(process.stdout, 0, 0);
    }
  }
}

export default PaceTrace;
