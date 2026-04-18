
## Input

```javascript
// @validateNoDerivedComputationsInEffects_exp
import {useEffect, useState} from 'react';

export default function Component({input = 'empty'}) {
  const [currInput, setCurrInput] = useState(input);
  const localConst = 'local const';

  useEffect(() => {
    setCurrInput(input + localConst);
  }, [input, localConst]);

  return <div>{currInput}</div>;
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{input: 'test'}],
};

```


## Error

```
Found 1 error:

Error: You might not need an effect. Derive values in render, not effects.

This state is computed from props (input) and kept in sync with an effect. Props are already reactive, so compute this value directly during render instead of mirroring it into state — this removes the redundant useState plus useEffect pair and avoids the extra render that can briefly show stale values to users. See https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state.

error.derived-state-from-default-props.ts:9:4
   7 |
   8 |   useEffect(() => {
>  9 |     setCurrInput(input + localConst);
     |     ^^^^^^^^^^^^ This is computed from props (input) — derive it during render instead of in an effect
  10 |   }, [input, localConst]);
  11 |
  12 |   return <div>{currInput}</div>;
```
          
      