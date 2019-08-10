﻿/*
 * Magic, Copyright(c) Thomas Hansen 2019 - thomas@gaiasoul.com
 * Licensed as Affero GPL unless an explicitly proprietary license has been obtained.
 */

using System;
using magic.node;
using magic.lambda.utilities;
using magic.signals.contracts;

namespace magic.lambda
{
    [Slot(Name = "set-value")]
    public class SetValue : ISlot
    {
        readonly ISignaler _signaler;

        public SetValue(IServiceProvider services)
        {
            _signaler = services.GetService(typeof(ISignaler)) as ISignaler;
        }

        public void Signal(Node input)
        {
            var dest = input.Get<Expression>().Evaluate(new Node[] { input });
            var source = XUtil.Single(_signaler, input, true);
            foreach (var idx in dest)
            {
                idx.Value = source?.Value;
            }
        }
    }
}