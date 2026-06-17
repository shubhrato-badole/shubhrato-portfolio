import { useEffect, useState , useRef } from "react";

const BUG_EMOJIS = ["🐛", "🐞", "🦗", "🕷️", "🦟"];
const SQUASH_MSGS = ["Fixed!", "Squashed!", "Patched!", "Resolved!"];

interface Bug {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

interface Popup {
  id: number;
  x: number;
  y: number;
  msg: string;
}

export default function BugSquash() {
  const [bugs, setBugs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(25);
  const [started, setStarted] = useState(false);
  const [done,    setDone]    = useState(false)
  const [popups, setPopups] = useState<Popup[]>([]);

const idRef   = useRef(0)
const areaRef = useRef<HTMLDivElement>(null)

}
