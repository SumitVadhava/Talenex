# ========= BUILD STAGE =========
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# copy everything from this folder (Talenex.API)
COPY . .

# restore & publish the API project
RUN dotnet restore Talenex.API.csproj
RUN dotnet publish Talenex.API.csproj -c Release -o /out

# ========= RUNTIME STAGE =========
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /out .

ENV ASPNETCORE_URLS=http://0.0.0.0:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "Talenex.API.dll"]
