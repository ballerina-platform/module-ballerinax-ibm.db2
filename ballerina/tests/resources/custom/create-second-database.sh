#!/bin/bash
# Creates the second database used by the distributed (XA) transaction test.
su - db2inst1 -c "db2 create database TESTDB2"
