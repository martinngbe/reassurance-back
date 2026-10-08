@echo off

REM Variables
set IMAGE_NAME=reassurance-back
set IMAGE_TAG=0.0.1
if "%~1"=="" (set IMAGE_TAG=0.0.1) else (set IMAGE_TAG=%~1)
set DOCKERHUB_USER=ngbemartin
set FULL_IMAGE=%DOCKERHUB_USER%/%IMAGE_NAME%:%IMAGE_TAG%
set LOCAL_IMAGE=%IMAGE_NAME%:%IMAGE_TAG%


echo "________________________"
echo Construction image
docker build -t %LOCAL_IMAGE% .
echo "________________________"
echo Tag image
docker tag %LOCAL_IMAGE% %FULL_IMAGE%
echo "________________________"
echo Push image
docker push %FULL_IMAGE%
echo "________________________"
echo Terminee