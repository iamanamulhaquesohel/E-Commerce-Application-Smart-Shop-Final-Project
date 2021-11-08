# E-Commerce-Smart-Shop-Final-Project
# SmartShop
A Ecommerce site Made with ASP .NET Core , ASP .NET Web API & Angular

# Technologies at glance
Frontend Technologies
JavaScript
Angular
TypeScript
SignalR

# Backend / API Technologies
ASP .NET Core Web API
ASP .NET Core
EntityFrameworkCore
SignalR

# Requirement
1. Install node js
2. Visual Studio Code 2019
3. Install dotnet ef global tool using this command dotnet tool install --global dotnet-ef

# Installation guide
1. Download the repositories.
2. Open the SmartShop.DataApi project in the command prompt & write the below command.
3. Add migration for SmartShopDbContext - dotnet ef migrations add "ss_v0" --project ..\SmartShop.DataLib\SmartShop.DataLib.csproj --startup-project .\SmartShop.DataApi.csproj -c SmartShopDbContext
4. Update migration for SmartShopDbContext - dotnet ef database update "ss_v0" --project ..\SmartShop.DataLib\SmartShop.DataLib.csproj --startup-project .\SmartShop.DataApi.csproj -c SmartShopDbContext
5.  Add migration for AppDbContext - dotnet ef migrations add "st_v0" -c AppDbContext
6. Update migration for AppDbContext - dotnet ef database update -c AppDbContext
7. Open SmartShop.Web project in the command prompt and run the server on 5001 port - dotnet run --urls=http://localhost:5001
8. Open the SmartShop.DataApi project in the command prompt and run - dotnet run
9. Open the SmartShop.Web\ClientApp in the command prompt and run - npm install & then ng serve -o
