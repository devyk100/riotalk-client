import { ThemeProvider } from "./components/theme-provider"
import { Button } from "./components/ui/button"
import MainPage from "./pages/main-page"

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
  console.log(ipcHandle)  

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <MainPage />
    </ThemeProvider>

    </>
  )
}

export default App
