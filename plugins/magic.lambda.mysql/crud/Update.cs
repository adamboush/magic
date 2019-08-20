﻿/*
 * Magic, Copyright(c) Thomas Hansen 2019 - thomas@gaiasoul.com
 * Licensed as Affero GPL unless an explicitly proprietary license has been obtained.
 */

using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using magic.node;
using magic.signals.contracts;
using ut = magic.lambda.utilities;
using magic.lambda.mysql.utilities;

namespace magic.lambda.mysql.crud
{
    [Slot(Name = "mysql.update")]
    public class Update : ISlot, IMeta
    {
        readonly ut.Stack<MySqlConnection> _connections;
        readonly ISignaler _signaler;

        public Update(ut.Stack<MySqlConnection> connections, ISignaler signaler)
        {
            _connections = connections ?? throw new ArgumentNullException(nameof(connections));
            _signaler = signaler ?? throw new ArgumentNullException(nameof(signaler));
        }

        public void Signal(Node input)
        {
            Executor.ExecuteCrud(
                input,
                _connections,
                _signaler,
                (n) => Executor.CreateUpdate(n, _signaler),
                (cmd) =>
                {
                    input.Value = cmd.ExecuteNonQuery();
                    input.Clear();
                });
        }

        public IEnumerable<Node> GetArguments()
        {
            yield return new Node(":", "*");
            yield return new Node("connection", "*");
            yield return new Node("table", "*");
            yield return new Node("where");
            yield return new Node("values");
        }
    }
}
