import Card from "../common/Card";

const items = [
  {
    name: "PDF",
    value: 60,
    color: "bg-blue-500",
  },
  {
    name: "Word",
    value: 25,
    color: "bg-emerald-500",
  },
  {
    name: "Excel",
    value: 12,
    color: "bg-orange-500",
  },
  {
    name: "Images",
    value: 8,
    color: "bg-violet-500",
  },
];

export default function StorageAnalytics() {
  return (
    <Card>

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Storage Usage
        </h2>

        <p className="text-sm text-slate-500">
          File distribution
        </p>

      </div>

      <div className="mb-6">

        <div className="mb-2 flex justify-between">
          <span className="font-medium">
            Used Storage
          </span>

          <span className="font-bold">
            3.8 GB / 5 GB
          </span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div className="h-full w-[76%] rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" />

        </div>

      </div>

      <div className="space-y-4">

        {items.map((item) => (

          <div key={item.name}>

            <div className="mb-1 flex justify-between text-sm">
              <span>{item.name}</span>
              <span>{item.value}%</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">

              <div
                className={`h-full rounded-full ${item.color}`}
                style={{ width: `${item.value}%` }}
              />

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
}