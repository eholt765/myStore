## To Use (Windows)
  # Download
  - Visual Studio 2022
  - MS SQL Express & SSMS
  - Node js
  # Set Up
  - Connect Visual Studio to SQL Express
  - Add database connections tring to appsetting.json file and change database connection name in Program.cs
  - Run provided queries in SSMS

  # Run program in Visual Studio
  
## Known Bugs
  - Add to cart sometimes fails. reload and log in. results should now be correctly displayed
  - Total sometimes extends past two digits ie 53.14 might be 53.14000005 (Can't place orders when this happens)
  - Search fails if no results found and then a valid search is done. Must clear input, hit enter, then search a valid input
