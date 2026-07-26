"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Spinner from "@/components/ui/Spinner";
import Textarea from "@/components/ui/Textarea";
import { useToast } from "@/context/ToastContext";
import type { Porosity } from "@/lib/color-engine/analyze";
import type { HairLevel } from "@/lib/color-engine/levels";

const startingLevels = [
  "Level 1",
  "Level 2",
  "Level 3",
  "Level 4",
  "Level 5",
  "Level 6",
  "Level 7",
  "Level 8",
  "Level 9",
  "Level 10",
];

const targetTones = [
  "Neutral",
  "Ash",
  "Beige",
  "Gold",
  "Copper",
  "Red",
  "Violet",
];

type ConsultationFormProps = {
  currentLevel: HairLevel;
  targetLevel: HairLevel;
  porosity: Porosity;
  isAnalyzing: boolean;
  onCurrentLevelChange: (level: HairLevel) => void;
  onTargetLevelChange: (level: HairLevel) => void;
  onPorosityChange: (porosity: Porosity) => void;
  onAnalyze: () => void | Promise<void>;
};

function parseHairLevel(value: string): HairLevel {
  return Number(value.replace("Level ", "")) as HairLevel;
}

export default function ConsultationForm({
  currentLevel,
  targetLevel,
  porosity,
  isAnalyzing,
  onCurrentLevelChange,
  onTargetLevelChange,
  onPorosityChange,
  onAnalyze,
}: ConsultationFormProps) {
  const toast = useToast();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    toast.info("Analyzing the consultation scenario.");

    try {
      await onAnalyze();
      toast.success("Consultation analysis complete.");
    } catch {
      toast.error(
        "The consultation analysis could not be completed.",
      );
    }
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
      <div>
        <p className="text-sm text-white/40">
          Consultation input
        </p>

        <h2 className="mt-1 text-2xl font-semibold">
          Describe the starting canvas
        </h2>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={handleSubmit}
      >
        <Select
          id="natural-level"
          label="Natural level"
          defaultValue="Level 5"
          disabled={isAnalyzing}
        >
          {startingLevels.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </Select>

        <Select
          id="current-level"
          label="Current cosmetic level"
          value={`Level ${currentLevel}`}
          disabled={isAnalyzing}
          onChange={(event) =>
            onCurrentLevelChange(
              parseHairLevel(event.target.value),
            )
          }
        >
          {startingLevels.map((level) => (
            <option key={level}>{level}</option>
          ))}
        </Select>

        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            id="target-level"
            label="Target level"
            value={`Level ${targetLevel}`}
            disabled={isAnalyzing}
            onChange={(event) =>
              onTargetLevelChange(
                parseHairLevel(event.target.value),
              )
            }
          >
            {startingLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </Select>

          <Select
            id="target-tone"
            label="Target tone"
            defaultValue="Beige"
            disabled={isAnalyzing}
          >
            {targetTones.map((tone) => (
              <option key={tone}>{tone}</option>
            ))}
          </Select>
        </div>

        <Input
          id="gray"
          label="Gray percentage"
          type="number"
          min={0}
          max={100}
          defaultValue={30}
          disabled={isAnalyzing}
        />

        <Select
          id="porosity"
          label="Porosity"
          value={porosity}
          disabled={isAnalyzing}
          onChange={(event) =>
            onPorosityChange(
              event.target.value as Porosity,
            )
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Uneven</option>
        </Select>

        <Textarea
          id="history"
          label="Chemical history"
          rows={5}
          disabled={isAnalyzing}
          placeholder="Example: Permanent color on roots, previous highlights through mids and ends..."
        />

        <Button
          type="submit"
          fullWidth
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <span className="inline-flex items-center justify-center gap-2">
              <Spinner
                size="small"
                label="Analyzing consultation"
              />
              Analyzing...
            </span>
          ) : (
            "Analyze Consultation"
          )}
        </Button>
      </form>
    </section>
  );
}