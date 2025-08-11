import './App.css'

function App() {

  const customColors = [
    { name: 'primary-1', cssVar: '--color-primary-1' },
    { name: 'primary-2', cssVar: '--color-primary-2' },
    { name: 'secondary-1', cssVar: '--color-secondary-1' },
    { name: 'secondary-2', cssVar: '--color-secondary-2' },
    { name: 'accent-1', cssVar: '--color-accent-1' },
    { name: 'accent-2', cssVar: '--color-accent-2' },
    { name: 'background-1', cssVar: '--color-background-1' },
    { name: 'background-2', cssVar: '--color-background-2' },
    { name: 'info-1', cssVar: '--color-info-1' },
    { name: 'info-2', cssVar: '--color-info-2' },
  ];

  return (
    <div className="App p-6">
      <h1 className="text-3xl font-bold mb-6">Custom Tailwind Colors Example</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {customColors.map((color) => (
          <div key={color.name} className="rounded shadow p-4 text-white flex flex-col items-center" style={{ backgroundColor: `var(${color.cssVar})` }}>
            <span className="font-semibold text-lg">{color.name}</span>
            <span className="text-sm">var({color.cssVar})</span>
            <div className="w-12 h-12 rounded-full mt-2 border-2 border-white" style={{ backgroundColor: `var(${color.cssVar})` }}></div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Example Usage:</h2>
        <div className="p-4 rounded text-white" style={{ backgroundColor: 'var(--color-accent-2)' }}>This box uses CSS variable <b>var(--color-accent-2)</b> from the configuration.</div>
      </div>
    </div>
  )
}

export default App;