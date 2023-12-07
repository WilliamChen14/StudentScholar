#!/bin/bash

echo "Starting backend..."
cd backend
npm start &
cd ..

echo "Starting frontend..."
cd frontend
npm start &
cd ..

echo "Both servers are running..."