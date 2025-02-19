import { AppRouter } from "./router/Router.tsx";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Toaster position="bottom-right" expand={true} richColors />
      <AppRouter />
    </>
  );
}

export default App;
