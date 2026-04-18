
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

This state is computed from other local state (count) and kept in sync with an effect. Compute the value directly during render (or wrap it in useMemo only if the computation is expensive) instead of mirroring it into another useState — this avoids the redundant state and the extra render the effect triggers, which can briefly show stale values to users. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state.

error.derived-state-from-local-state-in-effect.ts:10:6
   8 |   useEffect(() => {
   9 |     if (shouldChange) {
> 10 |       setCount(count + 1);
     |       ^^^^^^^^ This is computed from local state (count) — derive it during render instead of in an effect
  11 |     }
  12 |   }, [count]);
  13 |
```
          
      