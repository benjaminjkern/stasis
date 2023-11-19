# What is Stasis?
Stasis is a static semantic analyzer and code "hyper linter".


### Things Stasis can (will be able to) do
- Analyze your code and tell you about any potential problems it will have BEFORE running it
- Return multiple errors rather than just the first error that happens
- Tell you whenever you change your code exactly what will break (if anything) across the stack

### Smaller scale things
- Catch infinite loops and infinite recursions in finite time (Probably won't be able to catch all of them)
    - Do math to figure out approximately how long a loop will run for
        - Linear updates
            - f x = a * x + b => (f ^ n) x = (a ^ n) x + b (a ^ n - 1) / (a - 1), can check if this is in a range or will ever be in a range for example
                - if a = 1 => (f ^ n) x = x + n * b
            - In some cases we can tell exactly how many loops will run and preset values without running the whole loop
        - Probably others
        - Loose upper and lower bounds
        - Outside of this just assume it can be any number
    - If a stasis node is re-evaluated, check the state it was first evaluated with, track all states that were affected directly by the current branch, if none of them affect the cause of this state then it flags it as an infinite loop
        - Also track if a state changes but then gets reset
        - If a stasis node is re-evaluated past a threshold number of times with differing affected causal state every time, stop evaluating
    - If all else fails just say "Hey I'm not entirely sure how long this loop will take, maybe keep an eye on it"