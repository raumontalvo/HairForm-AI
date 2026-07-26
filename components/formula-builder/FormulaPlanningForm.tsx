"use client";

import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/context/ToastContext";
import type { FormulaPlan } from "@/lib/hair-session/types";

type FormulaPlanningFormProps = {
  plan: FormulaPlan;
  onPlanChange: (plan: FormulaPlan) => void;
  onSave: () => boolean;
};

export default function FormulaPlanningForm({
  plan,
  onPlanChange,
  onSave,
}: FormulaPlanningFormProps) {
  const toast = useToast();

  function updatePlan<Key extends keyof FormulaPlan>(
    key: Key,
    value: FormulaPlan[Key],
  ) {
    onPlanChange({
      ...plan,
      [key]: value,
    });
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const didSave = onSave();

    if (didSave) {
      toast.success("Active Hair Session saved.");
      return;
    }

    toast.error(
      "The active Hair Session could not be saved.",
    );
  }

  function handleClear() {
    onPlanChange({
      tonalFamily: "",
      developerChoice: "",
      applicationStrategy: "",
      processingNotes: "",
      professionalNotes: "",
    });

    toast.info(
      "Formula plan cleared. Save the session to keep this change.",
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-black/20 p-5"
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/35">
          Planning
        </p>

        <h2 className="mt-2 text-lg font-semibold text-white">
          Build the service plan
        </h2>

        <p className="mt-2 text-sm leading-6 text-white/50">
          Record your professional choices and connect them to the active Hair
          Session. HairForm AI supports the reasoning process without replacing
          product instructions or professional judgment.
        </p>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Select
          label="Target tonal family"
          value={plan.tonalFamily}
          onChange={(event) =>
            updatePlan("tonalFamily", event.target.value)
          }
        >
          <option value="">Select a tonal family</option>
          <option value="natural">Natural</option>
          <option value="warm">Warm</option>
          <option value="gold">Gold</option>
          <option value="copper">Copper</option>
          <option value="red">Red</option>
          <option value="cool">Cool</option>
          <option value="ash">Ash</option>
          <option value="violet">Violet</option>
          <option value="beige">Beige</option>
          <option value="custom">Custom blend</option>
        </Select>

        <Select
          label="Developer choice"
          value={plan.developerChoice}
          onChange={(event) =>
            updatePlan(
              "developerChoice",
              event.target.value,
            )
          }
        >
          <option value="">
            Select your planned developer
          </option>
          <option value="deposit-only">
            Deposit-only system
          </option>
          <option value="10-volume">10 volume</option>
          <option value="20-volume">20 volume</option>
          <option value="30-volume">30 volume</option>
          <option value="40-volume">40 volume</option>
          <option value="manufacturer-specific">
            Manufacturer-specific option
          </option>
          <option value="not-decided">
            Not decided yet
          </option>
        </Select>
      </div>

      <div className="mt-5">
        <Select
          label="Application strategy"
          value={plan.applicationStrategy}
          onChange={(event) =>
            updatePlan(
              "applicationStrategy",
              event.target.value,
            )
          }
        >
          <option value="">
            Select an application strategy
          </option>
          <option value="roots-first">Roots first</option>
          <option value="mids-ends-first">
            Mids and ends first
          </option>
          <option value="zone-application">
            Zone-by-zone application
          </option>
          <option value="virgin-application">
            Virgin application
          </option>
          <option value="retouch">
            Retouch application
          </option>
          <option value="corrective">
            Corrective application
          </option>
          <option value="strand-test-first">
            Strand test first
          </option>
          <option value="custom">Custom strategy</option>
        </Select>
      </div>

      <div className="mt-5 grid gap-5">
        <Textarea
          label="Processing notes"
          value={plan.processingNotes}
          onChange={(event) =>
            updatePlan(
              "processingNotes",
              event.target.value,
            )
          }
          placeholder="Document timing checkpoints, visual monitoring, strand-test observations, and manufacturer guidance."
          rows={4}
        />

        <Textarea
          label="Professional notes"
          value={plan.professionalNotes}
          onChange={(event) =>
            updatePlan(
              "professionalNotes",
              event.target.value,
            )
          }
          placeholder="Record client goals, zone differences, condition concerns, contingency plans, and follow-up recommendations."
          rows={5}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={handleClear}
        >
          Clear formula plan
        </Button>

        <Button type="submit">
          Save active session
        </Button>
      </div>
    </form>
  );
}