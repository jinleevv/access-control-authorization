import { useAtom } from "jotai";
import { atomWithImmer } from "jotai-immer";

const userFirstNameAtom = atomWithImmer<string>("");
const userLastNameAtom = atomWithImmer<string>("");

export function useHooks() {
  const [userFirstName, setUserFirstName] = useAtom(userFirstNameAtom);
  const [userLastName, setUserLastName] = useAtom(userLastNameAtom);

  return {
    userFirstName,
    setUserFirstName,
    userLastName,
    setUserLastName,
  };
}
