FROM microsoft/dotnet:sdk AS build-env
WORKDIR /app

# Copy everything else and build
WORKDIR /app
COPY . ./
RUN dotnet restore
RUN dotnet publish -c Debug -o /app/out
# RUN dotnet run --project ./WebApi/WebApi.csproj
# # Build runtime image
# FROM microsoft/dotnet:aspnetcore-runtime
# COPY --from=build-env /app/out .

# ENV ASPNETCORE_URLS http://*:8282
# EXPOSE 8282
EXPOSE 5000
EXPOSE 5001

ENTRYPOINT ["dotnet", "run", "--project", "./WebApi/WebApi.csproj" ]
