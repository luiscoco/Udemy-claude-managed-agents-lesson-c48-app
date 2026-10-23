import { text, number, flag, list, object, hash, report, unique, safePath, type Lesson, type Input } from "./core";

// A focused local experiment derived from this lesson’s reviewed presentation.
export const lesson: Lesson = {
  number: 48,
  title: "Model-driven and Host-driven Orchestration",
  description: "Suppose we want an architecture plan, a code change, and a review. Should an agent choose the next specialist dynamically, or should application code move through a fixed sequence? That is the control question in this lesson.",
  concepts: ["Fixed host stages differ from model routing", "Handoffs need validated bindings", "Stop on paused or unverified stages"],
  scope: "Executes an architect/developer/reviewer workflow with authored stage reports. It does not create three live agents. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.",
  cases: [{"id": "0", "label": "Complete the three-stage workflow", "input": {"pauseStage": "none", "reviewApproved": true}, "expected": "passed", "checks": {"stagesCompleted": 3}}, {"id": "1", "label": "Stop at a developer pause", "input": {"pauseStage": "developer", "reviewApproved": true}, "expected": "paused", "checks": {"stagesCompleted": 1}}, {"id": "2", "label": "Reject a failed review", "input": {"pauseStage": "none", "reviewApproved": false}, "expected": "rejected", "checks": {"stagesCompleted": 3}}],
  async run(input) {

const stages=["architect","developer","reviewer"], completed:Input[]=[];
for(const stage of stages){if(stage===text(input,"pauseStage"))return report("paused","A stage paused; downstream work was not admitted",{stagesCompleted:completed.length,reports:completed,pausedStage:stage},["Bind the stage to task and revision","Stop at an uncompleted handoff"]);completed.push({stage,taskId:"task-demo",revision:"rev-1",summary:`${stage} authored report`});}
const approved=flag(input,"reviewApproved");
return report(approved?"passed":"rejected",approved?"Host workflow reached its review gate":"Reviewer rejected the candidate",{stagesCompleted:completed.length,reports:completed,accepted:approved},["Run architect before developer","Validate each stage report","Do not treat handoff text as shared filesystem state","Require the independent acceptance gate"]);

  }
};
