# ========= BUILD STAGE =========
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj files and restore as distinct layers
COPY ["Talenex.API/Talenex.API.csproj", "Talenex.API/"]
COPY ["Talenex.Application/Talenex.Application.csproj", "Talenex.Application/"]
COPY ["Talenex.Domain/Talenex.Domain.csproj", "Talenex.Domain/"]
COPY ["Talenex.infrastructure/Talenex.infrastructure.csproj", "Talenex.infrastructure/"]

RUN dotnet restore "Talenex.API/Talenex.API.csproj"

# Copy everything else and build
COPY . .
WORKDIR "/src/Talenex.API"
RUN dotnet build "Talenex.API.csproj" -c Release -o /app/build

# Publish
FROM build AS publish
RUN dotnet publish "Talenex.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# ========= RUNTIME STAGE =========
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Use the user's specific port configuration
ENV ASPNETCORE_URLS=http://0.0.0.0:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "Talenex.API.dll"]