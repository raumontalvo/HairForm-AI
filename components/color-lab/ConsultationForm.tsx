import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
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
  onCurrentLevelChange: (level: HairLevel) => void;
  onTargetLevelChange: (level: HairLevel) => void;
  onPorosityChange: (porosity: Porosity) => void;
  onAnalyze: () => void;
};

function parseHairLevel(value: string): HairLevel {
  return Number(value.replace("Level ", "")) as HairLevel;
}

export default function ConsultationForm({
  currentLevel,
  targetLevel,
  porosity,
  onCurrentLevelChange,
  onTargetLevelChange,
  onPorosityChange,
  onAnalyze,
}: ConsultationFormProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-[#111111] p-6 sm:p-8">
      <div>
        <p className="text-sm text-white/40">Consultation input</p>

        <h2 className="mt-1 text-2xl font-semibold">
          Describe the starting canvas
        </h2>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          onAnalyze();
        }}
      >
        <div>
          <label
            htmlFor="natural-level"
            className="text-sm font-semibold text-white/75"
          >
            Natural level
          </label>

          <select
            id="natural-level"
            defaultValue="Level 5"
            className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
          >
            {startingLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="current-level"
            className="text-sm font-semibold text-white/75"
          >
            Current cosmetic level
          </label>

          <select
            id="current-level"
            value={`Level ${currentLevel}`}
            onChange={(event) =>
              onCurrentLevelChange(parseHairLevel(event.target.value))
            }
            className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
          >
            {startingLevels.map((level) => (
              <option key={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="target-level"
              className="text-sm font-semibold text-white/75"
            >
              Target level
            </label>

            <select
              id="target-level"
              value={`Level ${targetLevel}`}
              onChange={(event) =>
                onTargetLevelChange(parseHairLevel(event.target.value))
              }
              className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
            >
              {startingLevels.map((level) => (
                <option key={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="target-tone"
              className="text-sm font-semibold text-white/75"
            >
              Target tone
            </label>

            <select
              id="target-tone"
              defaultValue="Beige"
              className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
            >
              {targetTones.map((tone) => (
                <option key={tone}>{tone}</option>
              ))}
            </select>
          </div>
        </div>

        <Input
          id="gray"
          label="Gray percentage"
          type="number"
          min={0}
          max={100}
          defaultValue={30}
        />

        <div>
          <label
            htmlFor="porosity"
            className="text-sm font-semibold text-white/75"
          >
            Porosity
          </label>

          <select
            id="porosity"
            value={porosity}
            onChange={(event) =>
              onPorosityChange(event.target.value as Porosity)
            }
            className="mt-3 w-full rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none transition focus:border-amber-300/50"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Uneven</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="history"
            className="text-sm font-semibold text-white/75"
          >
            Chemical history
          </label>

          <textarea
            id="history"
            rows={5}
            placeholder="Example: Permanent color on roots, previous highlights through mids and ends..."
            className="mt-3 w-full resize-none rounded-2xl border border-white/10 bg-[#171717] px-4 py-3 text-white outline-none placeholder:text-white/25 transition focus:border-amber-300/50"
          />
        </div>

        <Button type="submit" fullWidth>
          Analyze Consultation
        </Button>
      </form>
    </section>
  );
}