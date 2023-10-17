# Mock-ecooperm-ryhuang

## PROJECT: Mock

Team members: Ethan Cooperman ecooperm, Ryan Huang ryhuang

Estimated time to complete: 15.0 hours.

Github repo: https://github.com/cs0320-f23/mock-ecooperm-ryhuang

## DESIGN CHOICES:

1. Created a ControlledInput file to make sure that all the inputs are formatted uniformally in the same area in the screen.
2. All prior history of user inputs are logged and shown on screen. This is made possible through out REPLHistory.tsx file that stores incoming inputs and maps all the inputs onto the screen.
3. REPL input separately handles user inputs from the command line/bar.
4. The success and error responses are handled in Evaluate.ts. The evaluate method in there evaluates whether an input should show an error response or show a datatable/output string. It also handles mode changing (which is also a part of user input).
5. Whenever we want to view a csv file or show the rows corresponding to a search query, we display this as a neat HTML table.
6. To mimick the behaviors of load, search, and view, we created mock classes for each of these.
7. Overall style of the application was defined in the css files.

## BUGS:

We do not believe that there are any outstanding bugs in our Mock implementation at this time.

## EXAMPLE USAGE:

Make sure the server is running first!

Go to http://localhost:8000

Command Line Inputs:

Loads a file to the server: load_file [csv file]

Views the file: view

Searches the file:

1. search [column name] [value]
2. search [column index] [value]
3. search [value]

## TESTS:

1. App.spec.ts: Tested that the application shows the command input bar and button (with working functionalities)
2. Load.spec.ts: Tested that the load command is able to properly load a csv file with correct outputs onto the screen. We also tested mode switching to ensure that load would still ouptut the correct strings.
3. View.spec.ts: Tested that the view command is able to view a loaded csv file and output the correct datatable onto the screen. We also tested edge cases like viewing when no file is loaded.
4. Search.spec.ts: Tested that the search command is able to search a loaded csv file (and ensured that this works with different search types)
