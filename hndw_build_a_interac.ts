interface Script {
  id: string;
  name: string;
  steps: Step[];
}

interface Step {
  id: string;
  type: string;
  data: any;
  nextStepId: string;
}

class AutomationScriptAnalyzer {
  private script: Script;

  constructor(script: Script) {
    this.script = script;
  }

  analyze(): void {
    console.log(`Analyzing script: ${this.script.name}`);
    this.analyzeStep(this.script.steps[0]);
  }

  private analyzeStep(step: Step): void {
    console.log(`Analyzing step: ${step.id} - ${step.type}`);
    switch (step.type) {
      case 'INPUT':
        console.log(`  Input: ${step.data}`);
        break;
      case 'CONDITION':
        console.log(`  Condition: ${step.data}`);
        break;
      case 'ACTION':
        console.log(`  Action: ${step.data}`);
        break;
      default:
        console.log(`  Unknown step type: ${step.type}`);
    }
    if (step.nextStepId) {
      const nextStep = this.script.steps.find((s) => s.id === step.nextStepId);
      if (nextStep) {
        this.analyzeStep(nextStep);
      } else {
        console.log(`  Next step not found: ${step.nextStepId}`);
      }
    }
  }
}

// Test script
const script: Script = {
  id: 'SCRIPT1',
  name: 'My Script',
  steps: [
    {
      id: 'STEP1',
      type: 'INPUT',
      data: 'Enter your name:',
      nextStepId: 'STEP2',
    },
    {
      id: 'STEP2',
      type: 'CONDITION',
      data: 'name.length > 0',
      nextStepId: 'STEP3',
    },
    {
      id: 'STEP3',
      type: 'ACTION',
      data: 'Print a greeting message',
      nextStepId: 'STEP4',
    },
    {
      id: 'STEP4',
      type: 'INPUT',
      data: 'Enter your age:',
      nextStepId: 'STEP5',
    },
  ],
};

const analyzer = new AutomationScriptAnalyzer(script);
analyzer.analyze();