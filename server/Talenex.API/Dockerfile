# ===== BUILD STAGE =====
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# copy everything under server/
COPY . .

# restore solution
RUN dotnet restore Talenex.sln

# publish API (solution references included)
RUN dotnet publish Talenex.API/Talenex.API.csproj -c Release -o /out

# ===== RUNTIME STAGE =====
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

COPY --from=build /out .

ENV ASPNETCORE_URLS=http://0.0.0.0:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "Talenex.API.dll"]
