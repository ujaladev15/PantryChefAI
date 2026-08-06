import { useState, useCallback } from "react";

/** Simple hook to drive the <Snackbar /> component from any screen. */
export default function useSnackbar() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showSnackbar = useCallback((msg) => {
    setMessage(msg);
    setVisible(true);
  }, []);

  const hideSnackbar = useCallback(() => setVisible(false), []);

  return { visible, message, showSnackbar, hideSnackbar };
}
