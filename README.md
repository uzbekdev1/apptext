# AppText
AppText is a Content Management System for Applications. A hybrid between a headless Content Management System and a Translation Management System.

AppText is built with [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet) and [React](https:reactjs.org). It is installed via [NuGet packages](https://www.nuget.org/packages?q=apptext).

![.NET Core Build](https://github.com/martijnboland/apptext/workflows/.NET%20Core%20Build/badge.svg)
![Nuget (with prereleases)](https://img.shields.io/nuget/vpre/apptext)

## Who should use it?
AppText is intended for .NET application developers who want an easy way of managing content for their applications and being able to delegate content management to non-developers.

## Getting started

A complete getting started guide can be found on the [AppText web site](https://apptext.io/docs/installation). You can also check out the [examples](https://github.com/martijnboland/apptext/tree/main/examples).

## Development and contributing

### Prerequisites

AppText is a .NET Core app and uses React for the Admin app. You should be able to run it on any platform that supports .NET Core (Windows, MacOS, Linux). To build it, you'll need the [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1) and a reasonably recent version of [node.js](https://nodejs.org), for example, the latest LTS version. 

### Get the source code

```
git clone https://github.com/martijnboland/apptext.git
```
Navigate to the folder where you cloned the sources. You'll see a /src folder and in that folder the following components:
- AppText - the core logic with the REST and Graphql api's and a [file-based storage engine](https://github.com/cloudscribe/NoDb);
- AppText.AdminApp - the management application;
- AppText.Localization - enables .NET Core apps to use AppText dynamic resources with the standard .NET Core localization API;
- AppText.Storage.LiteDB - storage engine based on [LiteDB](https://www.litedb.org/);
- AppText.Translations - module that adds a global 'Translation' content type and provides a REST endpoint to retrieve content as JSON, .NET resx or GNU gettext PO files.
- HostAppExample - ASP.NET Core template app with authentication that hosts AppText as embedded application. This one is also configured by default to use the LiteDB storage engine.

### Build and run API and Admin app
Follow the steps below to build and run the AppText API and Admin App.

Open a terminal window and navigate to the /src/AppText.Admin/ClientApp folder, then build the React Admin app with
```
npm install
npm run build
```
Open a second terminal, navigate to the /src/AppText.AdminApp folder and execute
```
dotnet run
```
The admin interface will become available at https://localhost:5101/apptext. It is set up that it will initialize itself as app in the AppText storage at startup.

When developing the Admin app, you can run the webpack development server (with Hot Module Reloading) from the /src/AppText.Admin/ClientApp folder with
```
npm start
```
The Admin app will then be available at http://localhost:8080.

### Build and run the Host App example

An alternative way of running AppText from source is by building AppText and AppText.Admin first, but then running the HostAppExample. This showcases how AppText can be integrated in any existing ASP.NET Core web application.

Open a terminal, navigate to the /src/AppText.AdminApp/ClientApp folder and execute
```
npm install
npm run prod
```
Then navigate back to the sources root folder (where AppText.sln is located) and execute
```
dotnet build
```
Finally go to the src/HostAppExample folder and execute
```
dotnet run
```
The host app is available at https://localhost:5001 and the AppText admin app is at https://localhost:5001/apptext. Note that you have to create an account first and log in before you can access the admin app.