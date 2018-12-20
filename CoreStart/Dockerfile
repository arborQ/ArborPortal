FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

# Copy everything else and build
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Debug -o /app/out

# Build runtime image
FROM microsoft/dotnet:aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "WebApi.dll"]

EXPOSE 5000
EXPOSE 5001