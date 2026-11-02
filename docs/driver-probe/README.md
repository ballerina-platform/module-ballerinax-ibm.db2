# JCC driver binding probe

`Probe.java` and `Probe2.java` exercise the IBM JCC driver directly, without Ballerina, against a copy of the test
schema in `ballerina/tests/resources/sql/setup.sql`. They record how the driver describes every Db2 column type,
how it binds each Java type and null, which notations it accepts for dates and times, how OUT and INOUT parameters
of every type are registered and read, and how batches, generated keys and identifiers behave. The connector's
parameter processors were written against these results; `probe-output.txt` and `probe2-output.txt` hold the
output of the run on 2 Nov 2026 against Db2 12.1.2 with JCC 12.1.5 (driver version 4.38.7).

The probes read the schema name `SCHEMA`; create it from `setup.sql` with `BALTEST` replaced, then run:

```bash
javac -cp jcc-12.1.5.0.jar Probe.java Probe2.java
java -cp jcc-12.1.5.0.jar:. Probe
java -cp jcc-12.1.5.0.jar:. Probe2
```

Findings that shaped the connector:

- `setNull(Types.NULL)` is rejected (`-4228`); a null of any other JDBC type is accepted by every column type.
- `setObject(OffsetDateTime)` and `setObject(OffsetTime)` fail; Db2 has no time zone types.
- `setDouble(NaN)` throws a `NumberFormatException` from inside the driver, and `setString("NaN")` for a `DECFLOAT`
  fails with `-4231`.
- `createNClob` is not supported; `createClob`, `setNString` and `setString` all work for `DBCLOB`.
- `createArrayOf` succeeds but a procedure cannot accept the array (`-4461`).
- `getString` on a binary OUT parameter returns hexadecimal text; `getBytes` returns the bytes.
- `getObject` on a `BOOLEAN` OUT parameter fails (`-4461`); `getBoolean` works but returns `false` for NULL.
- `registerOutParameter(Types.OTHER)` is rejected, so `DECFLOAT` OUT parameters are registered as `DECIMAL`.
- An INOUT parameter must be registered with the same JDBC type that was used to set it (`-4220`).
- A batch continues after a failure, reports `-3` for each failed element and chains one `SQLException` per
  failure; the generated keys of a batch are not returned.
- `TIMESTAMP(12)` keeps nine fractional digits through JDBC; `TIME` accepts no fraction.
- `VARCHAR` lengths are UTF-8 bytes; `GRAPHIC` lengths are UTF-16 code units.
