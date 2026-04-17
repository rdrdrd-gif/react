
## Input

```javascript
// @validateNoDerivedComputationsInEffects_exp

import {useEffect, useState} from 'react';

function Component({shouldChange}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (shouldChange) {
      setCount(count + 1);
    }
  }, [count]);

  return <div>{count}</div>;
}

```


## Error

```
Found 1 error:

Error: You might not need an effect. Derive values in render, not effects.

This value is derived from the local state value `count`, so it should be computed during render instead of inside an effect. Running a derived computation in an effect schedules an unnecessary extra render and can briefly show stale values to the user. Replace the `useState` + `useEffect` pair with a plain `const` (or `useMemo` if the computation is expensive) that is recomputed from the same source(s) during render. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state for more details.

error.derived-state-from-local-state-in-effect.ts:10:6
   8 |   useEffect(() => {
   9 |     if (shouldChange) {
> 10 |       setCount(count + 1);
     |       ^^^^^^^^ Derive this value during render instead of updating state from an effect
  11 |     }
  12 |   }, [count]);
  13 |
```
          
      