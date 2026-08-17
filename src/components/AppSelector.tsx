import { useMemo, useState } from "react";

type AppMetadata = {
  title: string;
  description?: string;
  order?: number;
};

type AppModule = {
  default: React.ComponentType<Record<string, never>>;
  metadata?: AppMetadata;
};

type AppItem = {
  id: string;
  title: string;
  description: string;
  order: number;
  Component: React.ComponentType<Record<string, never>>;
};

const modules = import.meta.glob<AppModule>("../lessons/*.{tsx,jsx}", {
  eager: true,
});

function getFileName(path: string) {
  return path.split("/").pop()?.replace(/\.(tsx|jsx|astro)$/, "") ?? path;
}

export default function AppSelector() {
  const apps = useMemo<AppItem[]>(() => {
    return Object.entries(modules)
      .map(([path, module]) => {
        const fileName = getFileName(path);

        return {
          id: fileName,
          title: module.metadata?.title ?? fileName,
          description: module.metadata?.description ?? "",
          order: module.metadata?.order ?? 9999,
          Component: module.default,
        };
      })
      .sort((a, b) => a.order - b.order);
  }, []);

  const [selectedId, setSelectedId] = useState(apps[0]?.id ?? "");

  const selectedApp =
    apps.find((application) => application.id === selectedId) ?? apps[0];

  if (!selectedApp) {
    return <p>No se encontraron aplicaciones en la carpeta src/apps.</p>;
  }

  const SelectedComponent = selectedApp.Component;

  return (
    <main className="portal">
      <header className="header">
        <div>
          <span className="eyebrow">Portal de aprendizaje</span>
          <h1>{selectedApp.title}</h1>
          {selectedApp.description && <p>{selectedApp.description}</p>}
        </div>

        <label className="selector">
          <span>Seleccionar lección</span>

          <select
            value={selectedId}
            onChange={(event) => setSelectedId(event.target.value)}
          >
            {apps.map((application) => (
              <option key={application.id} value={application.id}>
                {application.title}
              </option>
            ))}
          </select>
        </label>
      </header>

      <section className="content">
        <aside>
          <h2>Contenido</h2>

          <nav>
            {apps.map((application) => (
              <button
                key={application.id}
                type="button"
                className={
                  application.id === selectedId ? "active" : undefined
                }
                onClick={() => setSelectedId(application.id)}
              >
                {application.title}
              </button>
            ))}
          </nav>
        </aside>

        <article className="application">
          <SelectedComponent />
        </article>
      </section>
    </main>
  );
}