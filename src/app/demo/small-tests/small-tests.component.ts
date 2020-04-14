/*
 *  Copyright 2020  SenX S.A.S.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SettingsService} from '../../../../projects/warpview-ng/src/lib/services/settings.service';

@Component({
  selector: 'warpview-small-tests',
  templateUrl: './small-tests.component.html',
  styleUrls: ['./small-tests.component.scss']
})
export class SmallTestsComponent implements OnInit {


  theme = 'light';
  options: any = {
    gridLineColor: '#000000',
    fontColor: '#000000',
    mapType: 'DEFAULT',
    showControls: true,
    showGTSTree: true,
    foldGTSTree: true,
    autoRefresh: -1
  };

  tests = [
    {
      type: 'plot',
      description: ` Annotations only, from 1rst to 2nd of january 2000 0h UTC , every 1 hour.
                The string one contains some strange utf8 characters "ïs fælse".
                The cross of path on the map should be 2000/01/01 12:00:00.0000, even if you set your computer to
                another timezone.`,
      unit: '',
      warpscript: `"2000-01-01T00:00:00.0Z" TOTIMESTAMP 'start' STORE

                NEWGTS 'booleanone' RENAME
                0 24
                <%
                'h' STORE
                $start $h h + $h $h NaN $h 2 % 0 == ADDVALUE
                %>
                FOR

                NEWGTS 'stringone' RENAME
                0 24
                <%
                'h' STORE
                $start $h h + 24 $h - $h NaN
                $h 2 % 0 ==
                <% 'iß true' %>
                <% 'ïs fælse' %> IFTE ADDVALUE

                %> FOR`
    },
    {
      type: 'plot',
      description: ` Same as previous with some empty gts in between.
                    Annotations only, from 1rst to 2nd of january 2000 0h UTC , every 1 hour.
                    The string one contains some strange utf8 characters "ïs fælse"`,
      unit: '',
      warpscript: `"2000-01-01T00:00:00.0Z" TOTIMESTAMP 'start' STORE
                    NEWGTS 'emptyone, stack bottom' RENAME
                    NEWGTS 'booleanone' RENAME
                    0 24
                    <%
                    'h' STORE
                    $start $h h + NaN NaN NaN $h 2 % 0 == ADDVALUE
                    %>
                    FOR
                    NEWGTS 'empty one, middle of stack' RENAME
                    NEWGTS 'stringone' RENAME
                    0 24
                    <%
                    'h' STORE
                    $start $h h + NaN NaN NaN
                    $h 2 % 0 ==
                    <% 'iß true' %>
                    <% 'ïs fælse' %> IFTE ADDVALUE

                    %> FOR
                    NEWGTS 'emptyone, stack top' RENAME`
    },
    {
      type: 'plot',
      description: `Must switch into timestamp mode automatically.
                    annotations at -10 -5 0 2 4.
                    one is ordered, not the other.`,
      unit: '',
      warpscript: ` NEWGTS 'boolannotation, not ordered' RENAME
                    -5 NaN NaN NaN T ADDVALUE
                    4 NaN NaN NaN T ADDVALUE
                    2 NaN NaN NaN T ADDVALUE
                    -10 NaN NaN NaN T ADDVALUE
                    0 NaN NaN NaN T ADDVALUE
                    'g' STORE

                    $g CLONE 'boolannotation, sorted' RENAME SORT`
    },
    {
      type: 'plot',
      description: `Min time scale is timestamp 0.
                    jschart may consider this as "automatic minimum".
                    The spike in data is aligned to error annotation.`,
      unit: '',
      warpscript: ` "6sg7.........4rLGFvgLVs.o9qwqOh4NGX5aIaI942W1_OkxIzHKrSAUGSVLtOxUEzXN71ODjapKrA3Tck.RnOpgYHoFK.L49SbN50VGi66YgQ3lg9B0c.5V2J.c.P..HsHBDDHTFH10cF3.6zzy3QcoCPUjqxRLJP0VNiAbcuG_cDqVNu8aOLAbF_fD.AJoR55oVLJVGqK6mDNsph6PLXxc3kcziQh5OaODC_OLEYCAFXhcNBxeADWiPVCL_4_F6vEu6keLQIAevXbqT5KGh_g.2AyfNyOB6mf1T.z2xJKMsO_GynlZwnlmhN43Xb9ehJcsFut9kS8SW2Qp1mqyLG93IXIJYPbqRfAkBOd3rRwBaayctsOodFvTl2Om4Iyz2eeXq7O8bESzUQN6xzQfwRULyyGYv_0TlQBZVCPJpABSIhLhcPsZPig0UCbhGZ6W4UBLiiBEJPl9Jy839sy7jdOZzY6zyKURDNwh1IBBj02TVyKCf93s7Z36NgwbZpNefcKASPSX.caHCDI1.T58LzisSOueeYAMKNyN1IbZRbLTIVmgKf3UinpBrzZViUFxemIQWiPJb2sw7kdxc1YMzYmqeFFCXKx9iQXj5VBExFCPr.nV2YRaIyoVKL52NewFFG5NAN50gKjDPmkMIkkvFUbTZ5owipJRBX2KPt0v3TGcJrNidESXGo.ihRFNqti8j2O9N9O9GnQFhaD4h.o38O0oj08t9uJvJ9bUmiIR36VuMFlOyAodNrEwjZK1lyXRXnFxYc3YNi7mB7IbF3B.pUFnJznSw4Gx7Ndim9p4KdWb6iVhcC5FDwns5C_6tPVWX448jeN7BJ5ulJY9j64vwD29Wcq_fBAuUu97ulnRDw3t8oDKCeOmljuYMo.dlZPvP9tWm6ezBozYiAGkN8WOp6vfXf2HU6tXz33C8tEyxl3sBU52dWeCRbhdJkRjL4L3Kt5thiNOz52OzRT3FCDxK9E0q8RNQ4sa455.3rb5lCmtNPqBOwz9M.mh2InmWP0S1AfjcoB.acsNzJtg.NCO00RdAH47bVHJzayjg3grPtNK6LEIYvRryqDTmsEE2tSaZnlAJeJMm4nd7E4J3irzm.Um99cfPo0UkKoWaGIvEVORGNYCVQdPw5PSFsDinRnmo_qFV5Q6l03RMWtq.weW4iPrfBmZm.5lrkvMWjw1OHxgUokJ9rc3VuppHUf.h_4azI0xQiVNGckll8Pu1LSiOQjeMOHDGaAc_5DgN1ZzMXntRiy0_KqXsmaii30r4ubTpIClhbNv__6JVEVsHAOJ9xxU_IgNoGVKcKBptUq664yvvn3COm.DHcSmKcyYBHylB3YfID7YLT63CFd1nD4PZdUwliJ5USpw3FA6.XfaR48fU9CrCQoWUED61Yw05u41G5mGpxOh0t.lEznYq0_B95pDILopuFXkCuty4cPLXBc1sfYuliBY1mRf9yffr39FaScvvki5deQqe70jCQP..1yrgNV5Csox4z7F6GPJa633.EVcRLhaZ9XTauKuexiJamHfO9NCN7lR3paLO_AnJRX4Veihcak1A9HdfJcTqNJHauRG69LobQIh5YRtcvQtSAtl4jqE5CMEzCIjnWTJ3QtdNfxq5ethDVgUlE_RW_DZz5_YSSJDdibOTtv8Mtw2ZApyh2HCCpDiIeGpX_G82XDx9KR.TEDovHYPxN8TcOw_MVX3eCouYuWzF2sfuokkcJW2uXY4UynF3IZT9CJ68EZVRpWYRWQrCo3kyy.UuCQKlBJ8nwGH7GpIX.Hyair7sZOuaSBKInogR.sBbHKQcJtk4QJ6vH.Ow.D0AkDOu_1wN8GEpODblZnTBV0Em35lf2UZIAp1MODABtxwaB1Toh6Rc9Au7z.LhtcBYaUi7TS5WDmC2akGMZiyb.a5L3s_VeV0_yCkUEOlEL2nTgw7PRT1ZxaQ48IG68kwWM_OEmddJitAIoahkLODq26LX6VW6txU80_glo4zDhKPrwM7bNVp3vq70F.DoKhVKRMI1ck5dSPEwyXEQ2_27uSodWpuK5b4UtCnA2MqYWjHnNiLBKOOVCbDu4T.uGWbTW38Nvyrf2KxxOBINkrTh58PyYcWzW85Z_Hhtyh58EA0hdl_p_6FOCm5DUc0EhVd_lUKm0IGtUvsGs5CIAcvJfYCn32be4Ma7FZtD9GU_dS1x04ulWrYfkDSyGgp.X6HyLVd3bHYYyG3XG8lSsdXVMLwQl1YaSbSc7voCTSf6R8eOYfPUck9wAZBpSKEmm8SR7yKg6K._9vMrWckmN_0ebQfnOc3YyTkHjP2EKB_n8yyool97XeuhmU9R2Rz1TPYTfpKZ5pOyDXpkPWNYkrco7A4z0h3jPkBE4hgCrhmlU2Jq7IoeMwICtJpBNf3IoRQ8XrFab7R6QspA1KBZ8kSotP5GxYBEgOIeA3w1uk86XLHIu9XmKY7Yd4yxIcDinbQdJ57SjbBeYuP6UiWlqEcNxi6aZ97cbVTz.IjTQarayq5voWLSe2ewbUyR9usclkssYmtvrMMvu6h1zs2hVTTccAK4koygEtUK86At13wRUBIpXpsI8bOfvpXa08UATolpiMUt37sb3D9AlUc_SCGEVUMEw.qx6z6G39..."
                    OPB64-> UNGZIP 'utf8' BYTES-> EVAL

                    DEPTH ->LIST 0.000001 TIMESCALE
                    456664666
                    -545546668
                    200 200 '2D' PGraphics
                    Pencode 'an image here for fun'
                    NEWGTS 'emptyone' RENAME
                    'a string here for fun'`
    },
    {
      type: 'plot',
      description: ` Max time scale is timestamp 0.
                    jschart may consider this as "automatic maximum".
                    The spike in data is aligned to error annotation.`,
      unit: '',
      warpscript: `"6sg7.........4rLGFvgLVs.o9qwqOh4NGX5aIaI942W1_OkxIzHKrSAUGSVLtOxUEzXN71ODjapKrA3Tck.RnOpgYHoFK.L49SbN50VGi66YgQ3lg9B0c.5V2J.c.P..HsHBDDHTFH10cF3.6zzy3QcoCPUjqxRLJP0VNiAbcuG_cDqVNu8aOLAbF_fD.AJoR55oVLJVGqK6mDNsph6PLXxc3kcziQh5OaODC_OLEYCAFXhcNBxeADWiPVCL_4_F6vEu6keLQIAevXbqT5KGh_g.2AyfNyOB6mf1T.z2xJKMsO_GynlZwnlmhN43Xb9ehJcsFut9kS8SW2Qp1mqyLG93IXIJYPbqRfAkBOd3rRwBaayctsOodFvTl2Om4Iyz2eeXq7O8bESzUQN6xzQfwRULyyGYv_0TlQBZVCPJpABSIhLhcPsZPig0UCbhGZ6W4UBLiiBEJPl9Jy839sy7jdOZzY6zyKURDNwh1IBBj02TVyKCf93s7Z36NgwbZpNefcKASPSX.caHCDI1.T58LzisSOueeYAMKNyN1IbZRbLTIVmgKf3UinpBrzZViUFxemIQWiPJb2sw7kdxc1YMzYmqeFFCXKx9iQXj5VBExFCPr.nV2YRaIyoVKL52NewFFG5NAN50gKjDPmkMIkkvFUbTZ5owipJRBX2KPt0v3TGcJrNidESXGo.ihRFNqti8j2O9N9O9GnQFhaD4h.o38O0oj08t9uJvJ9bUmiIR36VuMFlOyAodNrEwjZK1lyXRXnFxYc3YNi7mB7IbF3B.pUFnJznSw4Gx7Ndim9p4KdWb6iVhcC5FDwns5C_6tPVWX448jeN7BJ5ulJY9j64vwD29Wcq_fBAuUu97ulnRDw3t8oDKCeOmljuYMo.dlZPvP9tWm6ezBozYiAGkN8WOp6vfXf2HU6tXz33C8tEyxl3sBU52dWeCRbhdJkRjL4L3Kt5thiNOz52OzRT3FCDxK9E0q8RNQ4sa455.3rb5lCmtNPqBOwz9M.mh2InmWP0S1AfjcoB.acsNzJtg.NCO00RdAH47bVHJzayjg3grPtNK6LEIYvRryqDTmsEE2tSaZnlAJeJMm4nd7E4J3irzm.Um99cfPo0UkKoWaGIvEVORGNYCVQdPw5PSFsDinRnmo_qFV5Q6l03RMWtq.weW4iPrfBmZm.5lrkvMWjw1OHxgUokJ9rc3VuppHUf.h_4azI0xQiVNGckll8Pu1LSiOQjeMOHDGaAc_5DgN1ZzMXntRiy0_KqXsmaii30r4ubTpIClhbNv__6JVEVsHAOJ9xxU_IgNoGVKcKBptUq664yvvn3COm.DHcSmKcyYBHylB3YfID7YLT63CFd1nD4PZdUwliJ5USpw3FA6.XfaR48fU9CrCQoWUED61Yw05u41G5mGpxOh0t.lEznYq0_B95pDILopuFXkCuty4cPLXBc1sfYuliBY1mRf9yffr39FaScvvki5deQqe70jCQP..1yrgNV5Csox4z7F6GPJa633.EVcRLhaZ9XTauKuexiJamHfO9NCN7lR3paLO_AnJRX4Veihcak1A9HdfJcTqNJHauRG69LobQIh5YRtcvQtSAtl4jqE5CMEzCIjnWTJ3QtdNfxq5ethDVgUlE_RW_DZz5_YSSJDdibOTtv8Mtw2ZApyh2HCCpDiIeGpX_G82XDx9KR.TEDovHYPxN8TcOw_MVX3eCouYuWzF2sfuokkcJW2uXY4UynF3IZT9CJ68EZVRpWYRWQrCo3kyy.UuCQKlBJ8nwGH7GpIX.Hyair7sZOuaSBKInogR.sBbHKQcJtk4QJ6vH.Ow.D0AkDOu_1wN8GEpODblZnTBV0Em35lf2UZIAp1MODABtxwaB1Toh6Rc9Au7z.LhtcBYaUi7TS5WDmC2akGMZiyb.a5L3s_VeV0_yCkUEOlEL2nTgw7PRT1ZxaQ48IG68kwWM_OEmddJitAIoahkLODq26LX6VW6txU80_glo4zDhKPrwM7bNVp3vq70F.DoKhVKRMI1ck5dSPEwyXEQ2_27uSodWpuK5b4UtCnA2MqYWjHnNiLBKOOVCbDu4T.uGWbTW38Nvyrf2KxxOBINkrTh58PyYcWzW85Z_Hhtyh58EA0hdl_p_6FOCm5DUc0EhVd_lUKm0IGtUvsGs5CIAcvJfYCn32be4Ma7FZtD9GU_dS1x04ulWrYfkDSyGgp.X6HyLVd3bHYYyG3XG8lSsdXVMLwQl1YaSbSc7voCTSf6R8eOYfPUck9wAZBpSKEmm8SR7yKg6K._9vMrWckmN_0ebQfnOc3YyTkHjP2EKB_n8yyool97XeuhmU9R2Rz1TPYTfpKZ5pOyDXpkPWNYkrco7A4z0h3jPkBE4hgCrhmlU2Jq7IoeMwICtJpBNf3IoRQ8XrFab7R6QspA1KBZ8kSotP5GxYBEgOIeA3w1uk86XLHIu9XmKY7Yd4yxIcDinbQdJ57SjbBeYuP6UiWlqEcNxi6aZ97cbVTz.IjTQarayq5voWLSe2ewbUyR9usclkssYmtvrMMvu6h1zs2hVTTccAK4koygEtUK86At13wRUBIpXpsI8bOfvpXa08UATolpiMUt37sb3D9AlUc_SCGEVUMEw.qx6z6G39..."
                    OPB64-> UNGZIP 'utf8' BYTES-> EVAL

                    DEPTH ->LIST 0.000001 TIMESCALE -1 TIMESCALE '+ flipped' RENAME
                    456664666
                    -545546668
                    200 200 '2D' PGraphics
                    Pencode 'an image here for fun'
                    NEWGTS 'emptyone' RENAME
                    'a string here for fun'`
    },
    {
      type: 'plot',
      description: `The time bound is defined by annotations, not by plottable data.
                    You must see annotation`,
      unit: '',
      warpscript: `NEWGTS 'bool 1 2' RENAME
                    1 NaN NaN NaN T ADDVALUE
                    2 NaN NaN NaN T ADDVALUE

                    CLONE 'bool in the future at 5' RENAME
                    5 NaN NaN NaN T ADDVALUE

                    NEWGTS 'plot 3 4' RENAME
                    3 NaN NaN NaN 2.2 ADDVALUE
                    4 NaN NaN NaN 3.2 ADDVALUE

                    NEWGTS 'plot -4 -3 ' RENAME
                    -4 NaN NaN NaN 2.2 ADDVALUE
                    -3 NaN NaN NaN 3.2 ADDVALUE

                    NEWGTS 'bool in the past at -6' RENAME
                    -6 NaN NaN NaN T ADDVALUE`
    },
    {
      type: 'plot',
      description: `On another endpoint, some annotation gts. Test the GTS selector to see if everything is normal.`,
      unit: '',
      warpscript: `{} NOW 296 h @senx/alerting/_fetch`
    },
    {
      type: 'plot',
      description: `Generate a lot of annotations`,
      unit: '',
      warpscript: `  NOW 'start' STORE
                    NEWGTS 'boolannotation50k' RENAME
                    0 50000
                    <%
                    s $start + NaN NaN NaN T ADDVALUE
                    %> FOR
                    DUP 'onemore50k' RENAME 10000 s TIMESHIFT`
    },
    {
      type: 'plot',
      description: `Generates annotation and data from 1rs of january 2000 to 2nd of january 2000.
                    data are aligned. Timestamp must be 1000x the microseconds one. date should be ok in scale and
                    tooltips.
                    Failure if one date is in year 31970...`,
      unit: '',
      warpscript: ` "2000-01-01T00:00:00.0Z" TOTIMESTAMP 'start' STORE

                    NEWGTS 'booleanone' RENAME
                    0 24
                    <%
                    'h' STORE
                    $start $h h + $h $h NaN $h 2 % 0 == ADDVALUE
                    %>
                    FOR

                    NEWGTS 'stringone' RENAME
                    0 24
                    <%
                    'h' STORE
                    $start $h h + 24 $h - $h NaN
                    $h ADDVALUE

                    %>
                    FOR

                    2 ->LIST 1000 TIMESCALE`
    },
    {
      type: 'plot',
      description: ` Generates annotation and data from 1rs of january 2000 to 2nd of january 2000.
                    adding us option to plot component should not change the default behavior.`,
      unit: '',
      warpscript: ` "2000-01-01T00:00:00.0Z" TOTIMESTAMP 'start' STORE

                    NEWGTS 'booleanone' RENAME
                    0 24
                    <%
                    'h' STORE
                    $start $h h + $h $h NaN $h 2 % 0 == ADDVALUE
                    %>
                    FOR

                    NEWGTS 'stringone' RENAME
                    0 24
                    <%
                    'h' STORE
                    $start $h h + 24 $h - $h NaN
                    $h ADDVALUE

                    %>
                    FOR

                    2 ->LIST`
    },
    {
      type: 'plot',
      description: ` Generates annotation and data from 1rs of january 2000 to 2nd of january 2000, in millisecond
                    data are aligned. Timestamp must be 1000 / the microseconds one. date should be ok in scale and
                    tooltips.
                    failure if one date is in the 70's.`,
      unit: '',
      warpscript: ` "2000-01-01T00:00:00.0Z" TOTIMESTAMP 'start' STORE

                    NEWGTS 'booleanone' RENAME
                    0 24
                    <%
                    'h' STORE
                    $start $h h + $h $h NaN $h 2 % 0 == ADDVALUE
                    %>
                    FOR

                    NEWGTS 'stringone' RENAME
                    0 24
                    <%
                    'h' STORE
                    $start $h h + 24 $h - $h NaN
                    $h ADDVALUE

                    %>
                    FOR

                    2 ->LIST 0.001 TIMESCALE`
    },
    {
      type: 'plot',
      description: `Generates data starting from now -10 s to now +10s. test different timezones to check if it is OK.`,
      unit: '',
      warpscript: ` NEWGTS 'booleanone' RENAME
                    -10 10
                    <%
                    's' STORE
                    NOW $s s + $s 0.0 NaN $s 2 % 0 == ADDVALUE
                    %>
                    FOR

                    NEWGTS 'stringone' RENAME
                    -10 10
                    <%
                    's' STORE
                    NOW $s s + 0.0 $s NaN
                    $s ADDVALUE

                    %>
                    FOR

                    NEWGTS '2h ago' RENAME
                    NOW 2 h - NaN NaN NaN 12 ADDVALUE
                    NOW 2 h + NaN NaN NaN -12 ADDVALUE`
    },
    {
      type: 'plot',
      description: `Generate GTS with the same name. colors must be different and ok.`,
      unit: '',
      warpscript: `NEWGTS 'a' RENAME
                    1000 NaN NaN NaN -1 ADDVALUE
                    2000 NaN NaN NaN 1 ADDVALUE

                    NEWGTS 'a' RENAME
                    3000 NaN NaN NaN -2.0 ADDVALUE
                    4000 NaN NaN NaN 2.0 ADDVALUE

                    NEWGTS 'a' RENAME
                    -1000 NaN NaN NaN 0.5 ADDVALUE
                    4000 NaN NaN NaN 0.0 ADDVALUE`
    },
    {
      type: 'plot',
      description: `Generate GTS in the past, life of Asterix.`,
      unit: '',
      warpscript: `"-0052-04-01T09:24:00.0Z" TOTIMESTAMP 'birth' STORE
                    "0008-12-05T16:22:00.0Z" TOTIMESTAMP 'death' STORE

                    // $birth ISO8601
                    // $death ISO8601

                    NEWGTS 'Asterix life' RENAME
                    $birth NaN NaN NaN "birth" ADDVALUE
                    $birth 18 365 * d + NaN NaN NaN "around 18 years old" ADDVALUE

                    $death NaN NaN NaN "death" ADDVALUE


                    NEWGTS
                    'Asterix internal temperature' RENAME
                    { 'unit' '°C' } RELABEL
                    'gts' STORE

                    //random temperatures during his childhood (15 years)
                    $birth
                    $birth 12 30 * 15 * d +
                    <% RAND 4 * 1 + TOLONG d + %>
                    <%
                    RAND 2 h * TOLONG + 'measuretime' STORE

                    //compute standard a value
                    36.5
                    RAND +
                    't' STORE

                    //illness : around 40°C
                    <% RAND 0.99 > %>
                    <% 40.0 RAND 0.3 * -0.15 + + 't' STORE %> IFT

                    $gts $measuretime NaN NaN NaN $t ADDVALUE DROP

                    %> FORSTEP


                    //life with magic potion (and very few illness)
                    $birth 12 30 * 15 * 1 + d +
                    $death 1 d -
                    <% RAND 9 * 1 + TOLONG d + %>
                    <%
                    RAND 2 h * TOLONG + 'measuretime' STORE

                    //compute standard a value
                    36.5
                    RAND +
                    't' STORE

                    //illness : around 40°C
                    <% RAND 0.995 > %>
                    <% 40.0 RAND 0.3 * -0.15 + + 't' STORE %> IFT


                    //magic potion : around 38°C
                    <% RAND 0.95 > %>
                    <% 38.0 RAND 0.3 * -0.15 + + 't' STORE %> IFT

                    $gts $measuretime NaN NaN NaN $t ADDVALUE DROP

                    %> FORSTEP

                    //day of his death
                    $gts $death NaN NaN NaN -5.0 ADDVALUE DROP

                    $gts`
    },
    {
      type: 'plot',
      description: `Real boat data starting from around 12 o'clock local time (15h UTC). Switch to atlantic/bermuda time
                    zone, check the time everywhere.`,
      unit: '',
      warpscript: ` "60VGOb7iNL_hC2JiR5xnPMGdQqsQ.sV1PLF5NM8WOqxi068WNqJ0BFFiNM0k06G_RrFLvuLNewbBnsbs.GQqtyf2jyLC_Ec05k.a..0L.0XCl.3UXkV.........QAprS9COSWzcme_vfDaefeuevefebictaisOqmjCmBSbnyvlZJND5fJgLlpaeZCpYwPLCU9if2pf6Trl6bg8.VkVaB.3VYa083VkV04B7B.3tc27021IN..Ya31.M0QlEi2Xyz5UaTPfWyzSSzDxvvvv4YztGnSyyvUzuVzywnx9YjdUUtMmnSyjx3ejXKuSGUzrwTiXrtvzrz6.cDaiuDMtUzbztzLNjB2pa8gI55lfpMlvBIYuYsD28NMfhmw52KRizbNpOjr7zuyj0lDiMFlDYOuBMkqDDaxSY8Qj_Susy2jgRU0vNzATLw5OXUvUAqqDz25.NlW9jZBz8pNgUFRfipOP6VJ6eyvsNPvAi.hfS4fX4gei07TYjrRlA2Kpr760cIYlixlj.z0gGLLxiWYgjG7RQ6Fppput52qwTn5F9awX.BayvkRcCjgqVAsIffkG6DnpcvRj9TJ9VCtivfjAVGSNLKDxUlCkK_keTthQ7n2cf2XvHGUDBsjy1PnWfiXwmLDHWStzTRaoYcURSVBIwomLLn2cf2kSAEDYlZNVC0fLfp8yDiYFEVFgu0DX1Xq3cU8iMVkvydKMN40IbUAtlSytCsDfx7wirNH_tmEDre1fK.v5rFATJHMun5G_apy5aYTxCsD2pUud.zob2s92dFwi0fh3iSTtvkKddGQxoVzYwsiz8meYfkKzaTjUHC4mACZSNrfbyjOQkJ3aoPAXjmJcTy8b66L1sVf.UI7oSVLF3pBHQfbAgLSVhC1NRcomg_igUkYZQl_m3yIBjbJlL94cyY6.e3jv9s1ataIQIziKLw4pIsrWKnX51.mqtXIxVfAgHOm3QDv72y6TWAfc0cxbktU1rkNZuaRcPWYYvGtdy2zq9do2KmZnaCAzAm0IOAUjDi1_iuvu7lYo9_pj.MxtpHARfYYIRco2D20sr00vWQ8QKbQ3MsG.3tYOQdNffp03KtNJMNLKGrqe9v.QQSkaegey5UdndWChPhLEAztD8omY9VyzkR3Np0jt3KS0y6FxCUoUJlWQ4zs9c9aN9m4mgT9brctGMUFqkCVyEMFKa1td8jcizAtps8znuCkl_61KVf7V_bxoDLPK5zZWFh6eg6s5c0GDA0.IkhGHewGy4MViIY4NYdmNZUN4PBz9ld9r.7SuSR7SoDtd.pKZXX_1IGOVXZtMr_0q4JOMLdR7gVpyCO7lwDUyOOw5jmaFOSw._MNXYvj1FqiblOKuVr9RP4a35XqwP7M.kZGtQUvz27upjr3lC_ZWzkKG7Jwj0iggTfxubMZfiE1qfk1pM6h9p3E9LzK8zkOBg9VVtHNkNN9vvlvFHATyQQkAG9sxzir4bsrj34bq4OPWW9xaxpr_dBRjgesQk3Y9pbnJRdpx5hIfRHgCEkNNgyNHJCwZQEkxYonp1tCr90wZ26s5X24qxu.QoY9xMzNts120bMwCT5jiv82VZ3abIthrWUh_ZAaZsSUctofDKgYDnYrGpsD6SUhZ2PNEnov303PSbqaqdgnr.8eKgtKfV9rxgoBeXqnYOmUO.PJQV63_nyJU61SHoQJqz.iFJ3ZHynaKo7A5nThJ7HKMbY.MyazEdDsfMj69zPfM42bzQyNj8ZtqrD8aGEzrkLXxtLfj4UwBPX49ThUsYbpSpSy0e5O78dxR28QsMOITQXzlTpQTxtipaPLM00jjyULdesMBr6fQQoR9WBxsevPLX9gJCs.NwwBSnzkBx4tkvg5ZvHgzRIvlat2ByLU0MqvzJvyA3ewncuBljAhD41qbImlAvk4jt5nQMV3Qy1cAvs5KrKVihCw4fXlCoAp2tJov7jV5T5JmeOzsUslz5wcPvw292Nq19KI.YYM2Bosy.XgrPw9zt1N40aUXCO7fSCBldzjqYq6M0HKTVVcahRJ6.xy195uZOYk6I8cr2LQonvdDwiw1Hri_taSo3KMOk4TkgXBltnZVQQOhRy7iY5uK209lOJVz58Lx.gf39.jiJ23iJ0Y7bdaOnYAaDx.0ehaqEFBX40j2EsTO6LpCIrVgbf8hR4mXppKhCRycwLW7pW0ggw5ZxhKQgAiuTccSGdUIdA8O.YXIcuG_ynENNofegYxP6m6GT_VsckiKUxpOywlSXiquozNbF78saUhQjY7tPrzD5seCSBwV8xStqdw0Pgd45FBEV8KYEUQb4.p8nGdZWzWkYyCYL1KCjzyRsuz.xyAAdvw48aZxeMw5Vsju7jhKyYqrET_xL9GYhN3FZ5_grUva0k0Zm_evsmvwMdKa8aG_HZ3JvjoLBA6fX6x0zOrLgjNOS0ax3kt19mPdMb6pUs9KGLbTttRll5IOqy.RuKtI_cyVYOMmKrIdlQ6Sxq.KgnMiAV0tnXXMR7LYPTNd97LX_ODMB6CsQzJdu8YljIbnMRcekp_dW4tggDhVvWM.sqktjgCYrD4SppETo6P8NE7eBCIouD3IoBdLfTNi0QXfF7XfhVQ3WTlrg_wxFKXOmM_BiyNOf9khJU7_BDLozHus7uoRwQWoFEW_Be_unFu0FGQ3bUBgVOid_yrgG8H2_7EK5TIijUZTC8Qbw6kQz1jf78wkADEhRURX2NUNP3TQZyVpdbgQLdjFrfHihMwA1eOaKs4HjbocaLGuae3b_1mBQMfaYc_0OmepS440x2GIrWi6tPYQGci4_v0D6JRNua2o9t8UJG9RXxtSLDGR7nw6I8k2vg0kCepGkpU95mL1Ak43rTZ_DfbfJ0VXJWjvNgcuY5SvL_TU.gha9NtU.hmTSGTOmSmFv9_EsST20kUqYs5g6SdHz_uHh3q0jUWKklVPQLDiWfEjVGx5Oua8swKoSDnd3XOmit8ObdhaBckCA1EDFVtYdgDDXastlN4oXdtTiVD2xTimEkM3lii6bg4VKn5bWaV1NA.q8a.bVqmr7bl4wS0jemBfBtfiCbYtaescU6ua2DECVZ64Dq1fidQfMr6P7LXf5_9TVlseeqo9JNehcKP.wLj9RipIs8giJzuMF9nGVrAJbpofFVRzm2aJzAgFrbcSZ4k3GykrGwK4MkAEdCJeJFqw4f4AMCs1.U5MnfwvviWy1gH7hBhToawhCowlBCW.YigFgzvQYRf4Yk5DO_JWObPahwpEF78Y5rdjVHhltC94MuLfpEIrMTBWfHhCWAlXrixz08VH2PyxWP8PLssOSO42BrsKFDmF8zwJ0YrpGJwcLqIhT5w2LnGJmrw2L_bbIQg2BsSf7hs4fmOuL6RQ0hCPucMjJwagCgjUWDy4iGqEVKO8IUezWg4eXygT2vJO9JAmNuNekfA3Uk0NH5d8bkW8EOOaYP8baKVWiFyZHWmRT.ZnHviIrcHOdsuhIgnoPXcmtwckDM6DuzTFLDLeYsV4mnGVw2hu7D5fvV9vsLRVjquOk7vDXMKjzl_kRKYLucEVMqQIo9xt1sGEaGznWWdLuyjk41rRh3H2I9NbobOqrVUsnfxt4ml3UxQXQx4qvjNxWR3pGvMs5jrTSZjLEKVZ8S546_QZYiJ_f0mLpURqT8xSuzZUJCNPSPGDNMXoi6nFWvbUw8qSCs.rWljNziVeVqaHSzZ7rxaUtShOeqaPa1bjpBIEyNOsqzJ9R8yTM37N_IZ9VkQfBs0hSrlwuHvVTMlmt6pVaB32mIpeiYG2AR7jVWxZkK9PTVcxXA2dNoGAp_f.V.K4kS6pFzYpGZjSfk5Pl8IpblAf72pw.fzfwdnAcDKYt.xn1zfPDTPm2o6glejvjkDsIlod9BEPecsy4EUHf5vvKQfoRaQh6P0LIDA7Yk1TojHgfk6mYcKXI8PE2Znz1PmRKYFoUtUDudpQ78W_8ClCqTS6Qi4ILxw0JOhIwVOi..h6YstBsC4IY9roIJ1ESqYx7NJa8_UoESv10xLSu.65tgH3sm6oxhYVQQzhOlWJITWFALrsgWu2UKA4iAtEhMSSfjB531Hm8OkaexbcoKZ81blSbl5KUuGx24qGdCmxYvWC0B08CYQUdkID3RiiWzkmBECZNjZzoBz4HzI9hk5RVI._mQqnEGPTlE8xidHRNYkRuBfnzG17E1pTFAsiuI6qWGWLZQJEnkUft9NXl4XqfikyoAZVBisuB3rmuUXbB4XILjwGlOW8K6VIEhRu9wBYXEQtLQGHndGOE3wtpHc1KHO0jetM_P3B11hrfp88eIvCkfWcPCSekvGQTqnaSL.SZu.1uk.qBb8zm1DV7Rnq5FLtcrsTnr9v0lkETQyAanIlny5QhcmJqxaP1H44C.m4Tuayym0HiqL2KsCzuQjRbk81dzIqan1NP8Lx2JVGTYeiwy2AYvNEW9Wlvdnd9EkuR5OHLtvHFg1dXDt3U2QDlqAeQxJrzuTw_HCIjyDCvEOB3mr9aAyqsOUVLQFjOAr4_v_ynlruBzb1DhzwpHzr_9E348bqw0XvDDyMUCYBcsVEFMvBLm02QY_IGTlQiOBvi5fnp2O5B1qlYMz0LvOWU.2eFVfuhp0d_DS6W4VZXwT8FfdcMzX7xv5dhVsYMrwKYCSS0y2XdMcwipM_luUWRUL5U0J0nBctiJ64dzC.GBteLGQCJKW4IZl6zDaA8MElCGYB2UBGNlr_noSCOtrs4uO60XfWHi6QSDLstFNYsK.LaWLJKa7iPwbOWIEMlDoENDOVb.JGoLmUiV6wcLvfz8Gcr6mA3h_YF_S.G8d8vpYlqXoNr8BqMcB_NbjfEV9UfeGhqcGdekp0xbLugZadlm7hPLBw.NUAI4VP_MnLh0wlco7MKdrKrF0nP0SN6c0RptoSjH0Py6IRW.ax_EPkus.jjQsD_Pnpl8e5cvNkmop.L5D5wHKNbk6KBZZQmP8IyQdnSM24XWK6mwqHYk2.djIZ8s1NmNNiUaO2EAjmDS1ceXzY4jMFoWLeyBxWXN9n.ek0q0EN0_3Q_tzqMVBXvxFrN5bHRZU9Wo.ayp6jdrHGzbslZeHlAzB023vbDViG86pWJLPib2Lkm99xw.vB48vqMVJutLFrEP1vaszIcoGKqmk7NtEGGwkdWxoCGx3CFCaLNUZ0g7paiOKEF6_orwIKJCPRFGhOO5h36h4rmA3PAvDh0rDjqF7QblTAIVhHwJVr7Qrp0hq47J7qX64.HMfISL16UN6h7Rng2lEwAXlXXA0x.IECZNorVD5Ql9PrTM2MbGFlvRn8doKaGebUrLW4RmPSqDOvN6B15Gwnygun6zD57j9fb_.5EaWJcOzPAdemc_wo38UEMu2rB1qOnvqLh4nyC5_gzew.Sq4puPXynxpEZYlH_nOCwpoOrNbn0Lxc7gzq.22ZE2l.cxoi9EsBW9WvVDaN5MxxHh_dJVeGVecUyATpUZmIJRkhpqcA1UcshxlTY_QHt0p4KpKnajFGkCDtszXB1CeOWukFxhWEq1stLN3SHPortP5d3ey7FAwBWJKWJ9Fcb6c2ICLLcE3uKG026T9Uc63inJ64CfNuHR0adn41InzUsQApI_y6AscX4TPm6k97s_cattl9AEOVIh8gvyDb6eNJJJHTiI9qrj_AUYmyxmETYlKvmOzlWccv8Hzdfn75dv4PQKWGW0b3Nc51bzfRbGye1ykeB4dVMv5McGQOQ4YXTv58oz8vS4zK9GCUkfe_nSPU.cG8mROrFLmDRWhMoLeDqojUVCwUn61tgF.knhkKwJq.yXXbyVo9cYUAxH4wQQOVPksxXXGC8AzgSrAVVDIPaL.vPw9zsgqf5MQTdugaIbTy1xyj_4bV1E7cH_m6RO3bRkXA5rIvZN3p.cEisx_Uka0zejoTrPtlMEA6g3Q6kg.woQhB5hOmp.xVoAnKIbAGI2nI_7qZUchY19weJ5cK.1Rwwu2fQNf.B6Ul6Be2gvRLEO69rXZZMt8HSVR7UtcnlZzy5mBZUsma73Mm8Z6eaEXHhAyqUTNyf5fqqGz2s74KJ7STJCpypnRsSMQc.Fz.VdaK2mXX0ozX7_64bqNLUV2cItnikVfmILbTQq2SPazwan2c90zfiV3gpbKsFVtwAf0_YgDerE5irGTkSbCPAXeatGXM5Cq_7rRK6ciJIHUB0A8FVS40GmDloSQ23r7kn8qPdJY3aARvm46YfiDvINy0RJff9_QGLIiPZQr8cxOwfi5EFMaLnhWyIMyMJOi818hgrMZ0Vnq6dgigFg_8ryU..jqtDztwC2pnngWhyswWNWtSXL7PqHd6ou.QZoyVnpKLCzFbV8p3ZGenxRu5iAw1.bdHhdzGnnMEAQw8jylPm9O020ihriWw28.Un9mw1Jt1J_EuQq2_Pfbo.ouz38UETNTXDmnfJ3GqkbkeNyfJ0k2DLdo9HogrLWOymqB7lyILTk2WZMZMhAn5K_trVy7aA5g1mqsEr1DzGHhyqjVx5AHqPzwJWATaQ5Za8BM7.EUu5_w.qmsqAEqbXo4qfYPucEm.0rGMLWlX7PBiCiNuZ9fULzVJqBbO7EVQF5qEIMVEV66Dq2uVqqjLpZiFuMOnmv3qJ6MLy2TkRgr0rdiVHOkf8roZwDQRVtnJePi.HaUgsVSopoKfYUy4Wtr_VpfJAvr48rw175vgpJyWcGrDLfn3gr0ow.DrnPn3MmDEtPxrMu5sqGWFo2cPxfbTcZLy2ehdLw97TAXowYj.I8XvkBzRCCCqO8Ew.PT6Adm7iR7OjdTSP3v_4lD4iTUGbVuj8Ey5Emxf_TV08e88hMaHqw.nHNU_UW9lG9JcrEpUVYx_s6JhnD3Ggj6FG9duq8LOJRxZ0BpPgoGdq2FxWLT8mQAWt.U7BaS4As6b_YjMFZuQmxG6MMV08QQLCchiw58nrVxVRCdwwYRMUxDvIBCpGURsc7CwBlbx.O_Hil4087e0gv4wVdJZax5J5KV0IDxR9O3S4aMLp437DQPOMaL_POGW0nqDEZj7ERbSaZd15dONvdf98tMJI6sP1jOy15iUQizBcVMQrgh6jG5LJj7bV0tYIicrzg3UycrMS0MlTxah_p8rkbBNS5GoIlCeBUQfJ4hf.mLZFOya8OKJmv6AB7vhJvl9qvjZzWMSh6alzopV48ov6YrZuP5y8s1TraWPqRVFcSMD1j_pHBOYwFRVtOKLST1F8n.NEQfp6ub385LqEFEeGteSW.0B1goqNFFT8NTt2z_rVaf38flhZvESyHKs8IamzGxG6I6QIsx4aUfAeaeQdHLBM95QL7EiS64v0y3wleEaIgLvV7RPyGnnJqbEVqQCtAy_HZNKorwM4_6pv02GNYmUZyfPlua8mh7M73LQERAjk.igLt9xIpRia6GYPHajnd9lniWwyICNiTug6HwTx4I_Ec5K8zMTuNytdFDYtVQ4BwcHihCqV__DxmUacBihRgHWSlyULKtp4T28whGYeThkQyFrN1Rq8qUjJB_7PM1w1qlfITmbOSBBZqtpvWD.dvwhsrDNeIcJsZo0mFku4_r4Xd.YWXDj01hSXylIAs3gfeXYL3mMOxIDN1i9tOv9PSeqVV4OibYw_4COFIEeI6t8ErXsFgwli7s17wCsMuugG3MvAI2NCwUM130B.THEfL.Z3Cqvz3iVPpvpAdfulCPPhmbn80Q8dj3BgLHb1uE.raAGNy1ItPoGZfKXihKsn7dZeTu85eqLMe5An3wTJiMEU_iIAHLZNObSVob2Ns.bMSD9pveebQ7z.tlMnpZTVxMml.u4gcxBMN_Lw1WWY1n1MORThG0Il9sJ8wPmmba9Q_i27b1xCZV2ozcvN1S94PvQb1Pwq6A_oFI02fiOTb.JwkXcOGyhmPUgknV_BaQeBo0PIJbATn0nlQ18OKihoYCfH6qtIVFbDE6SITz.3ihfNUl3jqSGymiFkbW23pOPOKWQ.Zp1.YyUrIQUcdDXHqgjsOneDIiTrd_547Jcjj5qLenFD4VikqWPPzNy0.A9E24yecvym9y89jACOQIqueSyDnQX7MbxuCyx54mhqH16pNnNku7OBdCShorkz5gT5WUrGUkPYzNIlnK9HZyE4d5VeIyv1TWMSgqNwL0mxzKO3LEpk50zGxC2PihBXJ9HLLDyME5ZWVyRKub.VePpAVx8uYDlCLm5jF1Qe9daxFaJ4nm2XulXaB_Sfp8ECgUSnWni8vsI1o.9S_AwQ8G.vZCb9E8z1QdWHCOu_I9RQ6iA60RaRdSaPmg7Pn6jc65XajV0f1iCcjfkAh2Mc2VQlx541WxHGLNyUNgiQPzN8qe.uk7KKsspOKLysOR.yR2cuTz2n88c9Uy7kq.tjVikS6exspRd7zKhbz7faxeKSi7NB4BuhToabXjIvAAldLxsEsu9ZMOX6OWWxEFqBBCJf5eeA1FSriuSlCfxdRlJzhODKbMcdDYI7_v1YoiXpTF7Wc_OsrYn3x1NAaDmryLDxsERp_lAKMVRcpr17K3.I1XXseLNh5grOq5HAIKOykeFJxyguRGHbfaiaSj0jtOBdKEc5uirawVVgqxYPg3A.A3jMRkzbtC4ht0Y1mO_1T_mj4hFogjid206rKupBc_KHXBlILI2I9rAOQHY4mD9QDRJUOj5pU9z0XLHan2oa4EcVR6BgSJ.Npz.v0qTz8XriJOMJXqzKeXZhkLEAT93PbtKcBkOWzT8pBqP4o1YWK6UQJfTle5LPMHxKhNHXHU7kiHWcldyvQxweUNK15mJCt3UeFuBfYuXu4IoxSu6GOgeZXtd4H.vDTJbeLG6pJw.lJBtWQJWvhtFmkQl.OVaXeiwd6vSOLhv07Eh4Wa1q9rqYaEPrrIJnySJUSAW7zf2j_fAIs5dQ7cnsggmbM1Xu1SPXsazMdrw.aQqDFKNuPhMGouKcLWqhdKMUZur8lhjUcN.GKkHnNsSvq8qghoxz0j.nh0c00Og6YQdJ6EhDEhjJQ9gIwGl4du6ltf7DrGvtMgu2DiuokFNCPg6Kbs2q1ZOQvs6kDnhi0z0N79tatqqoriGeUAJXO.AhFEQOgneK9Kq3m1Of_5DKq6KiL6v_E.cNxks4vjaFhL9AC54nJCBcuTgakvnukkKbKVnMLJy7i.klvtdjWPO8zz3zORVLAumcSjVlKFCLWwGbPRsGB5KIDf5EkNoO1TipE1pb1a1hJDYHIKxXy0S58Fqglhzn.TJGOvx8OWsHw7yFJ9XjvMCI5I87kHaqcJMfWU54dazFKUqeIdz2sVmpl0zYJeZQShABBp9R1deiVZsn7aJv.dz2U7ns7t3ALsNphw.vdmPo2qXebZasQ15i7OgS99XY4QxgtOUmK6oaZjYDrsHQDiiRUNmgBfLzXn5YOPDoixIBZy7PGZ7uotNBKxCfuzwyRKVqTsGROkOlouZf02jW8bVYJfLkO75FOeGMTP7BxDpL24.sY_5Vi69tYR.gTP79V9Dlfx_MRJ8_gjK5hfCL22_uKYZCwiRS5elqR_VM5S7MnvMP2WOVYgV5r4PJP5LphEPHktivyl2F7t_NDm660c19mxjLrx8UnbGZNTrVgO_AFIMI.PuiepN_ALxErcSg52qndSz020u_JpNjprLRoZ_P5gXcmdQOBVpWGSx0uEp87b.d5KMewI7MOXJzF27MqvxKo1KSA6y8iRk0ZZ_LWcBPJmerIr.Rj7CRHSGqgkV1hfnPE3f1v_9ewCy1TmJajdfF3CdcXyZETi5cDHC3.73DKtuSdqHPfEAORKBiP6zv.RkuD_KEVI.apDpz4ARrR5iAmYylEcoh5U52GrmtbmR2qj_aYktCEj0sW8KZdTLeqPnKdHY8UnoIb5pwGrTZE.oVyHbfG3_007a35MfGKWoJIuOyX4gd6_Z6pb5i05Ez_9QeU.PzKnoHeqCdaK2oVQpKYyOTjl34sOj8SDYz.fzDi5ph83cste3w3xt5nvNoEcdFWBXxMgguo8Wb7zRtxRZPQTwCmbz2JdbK6VuiPP__lKOW9HexX4iqYRSq9YJsqFFWfFU3Ro4T2JkDCmjjJ7OgAnmWANvObc_9n99nkWLvzk.LiN22HULVN_iOH5aYvFxMbvCwoGxnsUJGx0i_G7pkrK6w2JF4R1gIEti9n6UnDDEgOOVIeZVoMRSA6KvgREZpnCH7hbWpVPzo_kYT1oyeMl.KmsPj9HuR6Jt0RikKUdOJeEE3Yj4ETJrD4wdgBQ7re1z2Y5ZMM4rPAenyJWbzWWL4ZvisgevVZiid7OjySs1QbKjx5A0dw1NdgHIKqDBsYDuRfdLHzXK5FdKmXkzmXkzzjSwE_8arVIquCtGUkksuC6bgDkZmoZssqXPYt4sB5Ai2GVJ4OYsCJEboc2tDoiUflFjyoRi47SRO2Le_V_fBLzSB0L4dNLQms7fk9tSNs6ivkGOtT5MK58uy_Tl8bJnBTN9lnLjzquG6lDhhU8yRDQ8l.IIawzOtvGU.D.KbLJ9S3nrMJ7mm01i9Zvm8rpdpwrmVskQbCBL52I8zwU4qAQzI2umgPZRnoTx_ZOJRaO01Kx_CWparD5oJL1knWX2UNs6qv7zcmgJjxOiU7pdHPsjkdjVqsdtfBkKbeOYsQOtjwY9BclJjJuozLhDUFM53XQYEiIsyB7DKh2AHKlAPqwuKgN7I0jM.2STdTNAV24wOmEFlnPkwAO.YrTrauGnmKTcopPPT6NSk7bGtpaGKaAp6db9Fd8xQG4UqwSL8Yq3nOl3Y9.zbA2qQuXuxkeJMk1ddC7dgXeAGtA14sY6lpHdLM488lKASJmWEuJHzQj35KXjVviX6PtCPfPAncVDNF8er1naGlWYqUw.7BRL5zqePtbgSMTkaLVetaoJK8wx.5BJizZrKCJgLROi.7MZRj79kCZYjsOQXuSJNvJkbTNauW7lK7TEYPDeJbZw2w.vD0aIgZdkUx.NMn8B2xbwhIoQHjoMF.xMLWNLkarqv55hVJXU4qYv34lsOz7q27s94Z9ToU2L4pBbYbZktwl5Fl55mAMCMLIpoFrKFu1nt92rDeRUVmuURyCIs50GLF6mMEhivsgF7.KHc_TN70iMaVa7I3eRXLToD71fIhUHao.BtUJfvAvmphj0_KCQl3mw2wbpoxqsndiJ0f3APznQqUM8eGWGQBHllmlcDNDlfFnvuqtnsHLps4vMU6aVIy94V7f61.4NsaMHqJkYqzRNl_QjkRmDcFBzKUecGlilx.KjAwSf.cKUCwUGLxhGyW.jSptOwGOkOqemb0xvxQUCovivr7B0sZPyqYiTc0McnDfdp.dBFEHE27SR7Dzcg6x1EWPZqwQPhG.5vjAXGJPWOvcJQMUcqHtMyDthkCid3MrfpyYr8YToL7ScxWJGmY4aALeVIqDkthGS4TjZHWbIFI3h5ikniQrUV3qxjHMfvCePrppOvhTHUI1Q8Pcgc1GWbg_yWi5HdphqmrA80lVYWbTM3jE0eA.rNQZ2xf9aSDJu4LKGVOMswBmQ9oaOyl4gQpSBEKD5lkC_wroNh2KC0eANkBAii3tLOo5KgJv_jZuxDS6mrk4fGhHadL9iu4WCizsnvWkJAl3NLQ1vqSEo1RYTR_MNARvW232I7mtw.9udd9bfFsfLpjFD9xNvQFic9i2PUssDNGDUwTtLI7Udl8aURNg3CODWwkf.P0VL4pd1MERBHm5dSL3eCXAt2sCYM.S2RHTxCghRYnQhkYJ.Rgpxx..Bl_drqkp9.fCcvXU.Xiu92Xn134hmB9NRYCBIYsIOzEBFtXNVNeDXX3K8KAF9b8PFotnmSKZeTgQPbZCya8yXg6k07AOdwuz0kcCmERNusMola5JoY8HxcEVji1Vf1jmJlHJT.QqDmnJVMrPX4_HZt54JEx5HW54jysb2W4DC5xcQ40tbr0bTyIpKJIjBy4jIUMO8MsAdNloehxV1TjLByKClJdZUEMbzVgWtvBlCQ_8VJ8nwAw6zBAziGZCqdlrmchP8fuS87uuhfdGP19vCvwuVfFkEBcGvSJKM.8vIt__zOBcmG5s02H9tZwv316FoCS7nj5SUKvpEDTzX4NQGXgvrD84uzTX1djdBSOM0LanRTArRyHlFZrJL4N3yhyfz.MJcwUFGfKA82bKMSFILHIyvuSC1MV_VjpwlgaUFPAOudoQNyIPNZ3QGl5q98hDlVtkbgk2yccs4IEiiayHBRzn3b0ee8uL64hNYPBwxmTW5wS.soNlCymnexIw3Ed9e5qtIrSTSG.yx5Gz8evbLeJ4hbxe5QIh6MC4NMC3bhJ54FCYOT3X2KD5Pvd96RhfCoyz1c5GIlsU4C6Qw_k0AruQi5j2nkDVdCglixqJwdXXFefh8DGHISbaezAAeWvpIBgXRbfpxlmEivw.XVcFWzvZRUOn5hWCuBu3vqN7M6ABEj0r3jL6LH5f9kDfZlj6mHud4ZhUuQw5a3uP6zSPPGHMSZT5W0wu0aOrTuPx102j4xbjVaJJSCyCCXPeH1MfHmxetv8xDUVlBoiuf1UHt1kkifQRxdhwvRMKVOUi8kc36DrfdLFqed2aG2oi6yhfmy7b9bKQ0FZW8qp.CnIlIduTlpE5Juh4qrzGE.FydSH_NGxQdwX3z_GlKwmjIqfpOxmbzupC1mVFOTnP8pz4mXAGIrzJtY3OhKWC9gvI.J_Riuyl0x6mJPDwiwDlysbv7qMOqUFZeB73oz0ukv8GdabdtzwAjyc_NZtKOZYeI5wyk9EPojV0Q6VipPH6StIpDrHRW_AfsOJoZ1d0qmsi5U_afl9eHZu380QuRu4QeQDXbQkuiWdFRbBVIBAmTIsY5CZJ_ggNfk1HOZq4sjpGMBJXB98UJAtSW4lPrDYQZ9aDMPcCsZhnpb8v5Hut9QnGFttqWGtdPMbV2EW0Q662v.Xjbx4zHhCck60QmU4isEiwAN3xpwzz5Zk2Ei0O2LZKQBbPrCEQHAZ0BdceImn.STWvM2btBhpNkr7hMFAOIxUlwh90_I7_oLVndAwfkNjQDUVQ39ujvLm2IlDIqSFflU630x_iH65IWieP9pFxWQvqSOXjLvpjY0ev2pAeGjkCc8dLn7MMyTbBI6DjtAaZj4LUJajYNgfcI.urOVXWNzdz7W1LlLEZpuXt4mbZqaexImpELsvKTJhpoZ7KxVhr9SHAmA6hVKWKYBnKdQUShIeo60fq9pJzdWfrWTbud_CYFZcmWpMV4YNus1r.X8IQj9ShFLE0aZndSUkqk5C5MRcKiAjrpJv0wnMRmsHB6HxnCrHMeW6CEZuf_TC9rrD5wmLoZu3DhlhrY10.NYEJkTLSQrWpUj.ZRBXdT9KSVH_ig8lpJL07_9mFuOc0vusjtdbes2Sv8IIQyvlFjgOhaUiygVTZzssr38dpV98TlNw6mNt46l8T5a04qMNNLOqoAtdVFBVJYH2.dBJPDIGAWePqcy9xVf3Y1waCJaJke1d4QXXc5ZO9G1zBWuZunS6N8UXofxr_vXujh7SPSJzYAXMVFvpNuYN6Pmu29EukfhD1_VOIpb1jJXKWLG8Ao5AEFejJXED9hoC.95BQa6GJ6a0JmfvblzZvhVUNye0HjgdZ7KbX8WOw9KhJgxzEEZAMDMZ8DW_Obb0sCo49e7WJdjumcj._RsljnrlWZzjldGlIlrtWch8wsgLfCBxvv.C.X1jzE7Apv3lKs6DSLCdg2v03o2Xil7N_nPPqOQ7tGIfhtVAOenqA0U8v3JpD7IIHMCvIwCEvclX9T4DaIPytFrq6CqJnhzlEahS1uDDtGbEsa9kO4RzfZYs0HgROkY0Zpobowct9R5ZEwE7yI6YNnOhBRSU0QYi_xssJNu5teS5FnI0cr7pXx1eM8S.LM6PQFC6YCW8f0aXmmCJyM4arUGcYQkgID9lVXqJcaSgKH1wdXI6RIOYqmi2Bbhb26YaV7SLi1BOiVVPKW9chwO05LsI1BW1MY7yfPsJom_NbAFSU9Oq1p5yeIQ_55KHLTNFLeBr0dAE1vsbuKeFl84MwNvzyR_ZF7yeOcjpPO86mY6HZDb1.3qMpCxkMxb53n60DSMP7t7_CBMoWdcddvkKgGRj5GPsou64u7ENHpteD660s1VtoYUf4b0vRClHfBHLgJEW8HRLLdejnfVBMlNlqzlJd3LzgAF38ZrEw0NyssjHbZ2ZttDDpynd1VJmoVOXAPUWsRNyaBZQMHNSIynecnEdbAIvza_5hVf6a7MU8ZN_9NICz0t_ebb0eCa0sRrHx.iudJG0EflXAiP3o2hZ8qGmlxmW3ZuEuKuazIMPGZMb8xovlUVD5gddfDO9deRK0QYedjUXTCVBEHw9q8jVTVVfHI9nUdxoeffOz.ty82ZgmBPIFWuLYDSVxtgU1gLxQx7k2Rov6DPjKcSAudoSuVXC1dP.oNIR5tBrlZ5wvYYgw.NKoeCrcquhcJ8KPkAXfIzCMrx4.uIQYi_zZDqVx4BxwUJWbjr20TVdk_Tj.Fp.GZ8hCVOOiTbz24f8N4.xhZjsEYyW0CjCPxYtJhXtRtVeMK7be0bD4zQHoYR9kKL9GZKrh8l2Dc9gPsfrbJxFMSRQ7b26KUhQYk6R2pfdXuKKmth7mPMEQCmN_w4MoKayMDlkwopo40SpLAre3Ub5jfiTI1xuVIVuMYfEw0s9GChU_vDh3BLatwRXZzGVnJqNRoc0Hga3EerORrCHXuVx6uTs1RnFpbP6AmkWFDbMs9BwxC9H_JNC5M9hMr39YPJ3oSXfHTQ2ByX5E713BzKDgukeeP7lbhsR0prCrqwWozUQDw30ChGQlQ5o_xuXTkhR5YUgnrAZU32P6btxqjljg55lJSG3JnIvigyz.aeAygzhuU0Ewm9tii.07qYpPj.OuvebpjkD1qVENws7uA7keOCou_LMXu5Mk2720PtWcDFNtrdlAjysUfwwVen9VSL8Qz_8DRc5vEDAvD7wdto7pS8hMdAN3kui8rzSZNxukCTepNfH5GSLBlKZUzmZDDoFDAv3PkdgLJBnDI8Je3dr_gw8SJVHM5ni64r7l_Lb23FcPLhJisLAHwlismWOFp9KrMk2YvsZxz0C9R6hru2iTC03KRQ.jswlRLSnIh_k1YR89Ltn5DYGye7neGTrFs7c7UdaNRPTYpKmvieZxIcCviq2duFAUgPPC8KZPLCTB9BTpB1LaefHWe9iZOBc1aaht0LLJMpci4UcwkakWKj3otMGOsJYokjDEufrIAfNdxwYriN1vW56iS2BQhUF59l8iPVAXKupBOEyMFY31xm1xf6_OqchfbmoKOIxc_dQ7IuIgZMw7KfPYLBN6h5MHz0JGK5jhT.CmThQA.cRH4oj0dEVCRurjIBAEaKRvYEFWhIlgPoxDiJimh7HmIazgl4.xjXFltNuym7VtYMpJtvFY9ejhLul7FOOtLBw3DwxwvWjPkqyPGPiBuP30rGRC2.jA0C8t5XOQfgAQmN9rOXiRTKJ8Q9TOeScwoT3xWwQM8sCDerABORgIGr2q3KShTdG3URYXGIrk302kFuo_XV5_FKwNDVXWCpPECRGyjLIw5y__pTSTsLJ4qIjXUx6BKvLZdqCsh9sci3eXbYBTPYf5SBInrwVcPBQoHfjs6baHpamIruQRDDhNlz08Kl_jFhdh3x7cv.n.aeF6Co33juq42nOwXQQNJAthd7_V86CMaeiAWZBB.ULovHdJezfw13ckSiVRka0c_snzV4SuTOvrZRTxeSiTFiHWK6jeR5CCylGpDY8ASeNJNIqgHnzWDL3HmjiWhN.xSGEs2R8dJXGQoO7ynIEtchNzp6svQcr8LklKXeW1P6Cg_PQ1aZpbgvmlgyQy2NokhbeNLUV4anhU4PftNiNoivW0jY0uZo3FELm8DrpL7cuTxTOOAyWuPCnNkYLyPIfZ28gqfKcLw4L8KobUOLCkhBLd8yBgx5fXoYV4fYPQj5a01BD22iciJWIGwu5hrFsUDpBvoMX4Tfz4584W1becJ_aLYuuijYZC365VKLAVMQp1YKp9wiUdYo4SiRHD1ougR1E4U0eqozcr_L8lKOzHha04zTus57lUR0AtaqzZ899P3x4Pg0KVhLD4M6laqjT4jJ.Tdoo8_ZYh4QQ5Ge7MlheAVZZUHISibUk_g7tUPQkD3xOphvz5.JJOA1OAXMDLoBlSQN51Q_dklqJiNfgG68.nX__TV2VqYBqxGZK.RbD9YpGMa1TlNAlxEb1Y2Haq2iAPDWDmBgqMY3iA1BkwVAffd6iXa9_baey0UrIrojYMMZmSSRVTqQCjlIe8UZ91X_cgOojrxonw1vAW9YVD_Rs6_xHq1fmWqWi9KcIKAFKNmhfmVn1.KfdBB64CC1P7hqeL8FQurFm_cstc1KKzHx5aZbfJ.c_O3vlIR.wWSYU3WpKPCIjhhF3GirC.XWWXOtZD3duy1ShhVW3XNQgAb8FllmR7f40LmoWQHzNOOv7XiLXmDwuZm4Ys5zBYZBXll5WegtIycjAcmSNSHhAv89TFbX1iRHrY0iAuAuk0CKhr9eeEW4oD2ifD2rrqc84cSe8FE2Btg5TvFfkZIuIivQCodXyZGs91lhkLQ4qr8BXUl5GOOsW1LXRLh_Yx2R189z.KWv5n4JbS.kWMaURHKba0b8fMvZWtDKGKSZwVr9oS8hGVu27lu6k6AGapqW829bi6uBiGvG9tZxmZU9zUBLEKbe5W075MGhNsmY5r_XJhz0EY8YTh4sxssJTBzIP18aouiQFmfr4x8cgqXD7QP63E6hTHcaYNjOm7ce0pv2D0BfD_ew8Igd5fnHk0HB5LxGw_U3PRZkgPFCdDVLR1eaiIW2ek5P7lLjkjkH2jQvc9XrXze4e95ofRTreOASogYy67eHOHXIYPBbgtYt4zHqz7BfANyuI2ZQ3bUDJN9B__PrIGHHHzoBoNOLZv4IbmLLV6aNQiIWEIW2yQ9INnoNa4fvdQh5Opo90Cw.mGN9Jp1pvudgTvU.XOPW.KJi0XUOHggW9vBzlLEYjX8IwDTAPjd8ISsVS_c9IckvN984s1SeDehLHn8bGbOjlrwbhGxOP45y1vFzM1_E.NIgTADjDRJ_am8NkNA3KBr4j5XjuINwFkFhfsXyG7RdyIIxiS._.exPuQgRqdlSeFtP7OBMKvmvYcfF_gmIy4BPyxeEtuXA6_EZ35nKmQxYR4drzB7kR3hyfr1.zes.hEAepQtn4pNGC6hlFjhLyA3vnXVVsu_Czwt5DFdKT_gHBEIIa3DLOcCXaDPHUSl4bhBuCrENTLdNFCxdcDftCSjEDR8TafAn1hefmFTDzZPZvsdXPB9qzpDXGeT.zL4Kiirk8vO7Gx_dgnThYiC9KzpgiZtgDXySjlQyYqQTGPrj6yNQff3JLf7kPZACVbuGEZYCfwULJfih3M4vnubqtiHIwlTJeBkLm5Hs5WIcjCQF8.sgzZtL7XSoGFvkWvMgjZRbBNStwZfufMZvmOY1CyMUI92toSQssQz4WlZsWsMARAbekfQ9iy1i7c6YWpMNUIFNjk4MJHlpzwRKbQ4OwlW.tJxTHAd4wxomZlXA33PZuvBW3IRdCeZNJrdeLcSD5FBGAaeKdMl2SWexQNht7abPLM3.2dkNyNZU7Teg2.G9Kg_pEm.JlG0lHTdbV_tqfK16JDylmmWUSAk5K2aD652539aZinmujZmEB3eY97HlVGolXnw__g_.412KzkvkQwL7gonz2cvTrEEBu2VwQPCS8d_GX4nfU4xjYvO_YbFEbJAov4iPLYPzNdHUZuJFxX0wbleRgpBm4ahwhX5As7J8LcZa9QSXwhs4UAK1oJzBZm7k2AVmeMMDdCj3tAMv.3C38HEq_oH.5SuO8Wdg.kQn8ViIMQEENM0diPoQw4XOWwQQV3UtxSaEeSQY_gveBCVKKqKXndEcgp._eoS_Yo2XRvTCJnY5JIauUtYmb68PSvEw6j__pVhmPGZdVnxjDDTm9TVuTqTxaw.S6_Q5pdBHPxp8iG5qqH4BVznWEhW7fGbkjYXjkUqLQ8DrF7eICGEDiu1tgYD_12PtcOvFdcotQQBw5wLpPv8Od.bgZRurVMgO0sRjs7_wYomAEVpvvInPvIMOLAvlm4vBmNz0SIBQGdTwbuNQDn.kqlWISxBcA.uBAM4BsTjd3JN4fw5Q3r4uts4zl7NoiflcBAMhNKZu_th71nAjNmGqcESfIEMXaTkA5x3aj3yXDuBdt5w3Ikr5gbrX0efA4EoAF3aKAb5oqR.hherzmrjtoMKdMlmA7mSDW10JtBm7hb8mNvr..6qIFDyjAbb_Yq6fHuC53Pku2iIXrd1AeLDS6k41CHbXizFGT8ZZww0xG_lXsEwQXPOqkO3mpAC.dynuYBZvk7ztlPUDUWSjlqAEu7QLr4KznUsUjbi42yUA2qhGqTohh2fi.c7m897w53ayv2g4M2ikevkDKprEqlY5hoeozFdjWr_LYAwDFlavXIy3EWVm48pmSguWNpLp6_vJjUMkQxBazGC4gubLZqgKq858MDrzW9Io8btAU1BjIviMGVgfCAS.Tdp5sHWK__mTgmznO2QGBB02VqY0ZINXScxYFaBcT7JxDQZemKU.asL3nXtiz.N9hBjJFXfQJNJbTmNb5y.kqPwA3C6Io0B3ey2TA3gYW6j5v2dFf9ByIPBGxN6exy6_NTDcaw06j9_wZj1vybGOVbqxbM8pz.ped5WsTU.ODMLeTavg15ADUdxFAbXFEVhzKvaP.RTbluvpyqN1f7E5sVHsy8_hURK73qGhENRkBbT6uyztDbin7572uVanYnh7kGYPOPhi48XYdXnM0uYRu1xSNL8gDqDK8Ak6IYjuiqHtxkXVR50rOCdS.ae1dS2ffHQWVpZprZR4Shd6lyqxA4GBcE6tT9yHKGc.hEJps2VwbejbpSd5AFGzFnZGa3SaEZNrE2PVP9F3EUNPm8BlILp_aUkrkGIvxcRm.AYDypNv2xkcjVLp7RhpgVrjOADaW_3QNKZwdoFUv8t1bL9ihv0Us.jBvbUWBJjRNoap7F2QSFtOYEbKXglzCte6f5MWGF.LXNqFrrTkCmliEtM_C1AMM_ty5WfXp06h14I2QvTo_bBOCa_2YF9X_rWCuWzIACcyOTqO7uvS8LstQdz2AY7MOp5yiywhcGwIIEJE2aCnLxqf1Ucc0Miad.2mWQuvh84tjQgSgkHp3c9mC8RKCTJkLxlBLFwyGeLL5rIsCCu1GvO2Ac4eLJgpRDVZQQowpgGnxVSa6IBIh2Gdj8RP8ngFcIOuuTy0Uafg3sy.ttUKUjeg2djP2Z5uQzF4jnc0O.L9pxJixSf4ZBTJyQ1s8Pehk6UluD2WEvgcp6LAA7S_VLEDtemwOB6yLCInyaL_ukda.wRPwf_XrvqheqLIx4BQGuPutaaaIh.irBjx5jTYwT5wttGRXcLmXQsk9NudzXcLjRiUFOo5kflzIbbjBZowle_fvjXM1lVI.dCd4qopOaFQrzAEKUKrsnQ1JwNuRRYwULq9Iu1sZQujkEqrjC_7yxNaaNiBK1ylFf1HPj2UUVFSydRE2bWNymSaP22Rv80HngtYa3gMnhgc2s0_rEib6kDxBeiaEaPfekTuMVBs8XPRoEm0aksSwe5YSrm_mSU.Lsvxz7lM4tcmrk9BYFpb2NIobxZcIvtDPlgpGvz.YHGmJMKEojStSUiomkNyyWeq7L5DTR9nZ_s6NflKt6jAP3tnqufbRFD.uv_okTJQOHv3YGYUIjdt57yBpfvBf6hNtVe40nVcyGl9xEw54UIBrk6j7iltPGAsdVeJUdI1e7ZiTkv7CHuSyeO6n4RYv4_skmaNVxxNqwIoSednEXLSWlZLtgklUwkXEMnTHSernGUwjSrczaOHtUr8BG_IxillKXkia05jGzm2XyMRnhOFMpj9e7bKskAPZwPJNZrGbHj7MpIEHL0Rsz.cCrKz8GXdKsuTBa8NDO0EXOldt7REkDbNXbZZ7jxE2z8vF1R2I4HofdhHoej6oGunqSiPSWUuY_00hJT.oh9gMOUfjtxUY5KBBbx1_1vLABKVnJAOr6n2eIDRJ3OOiP3_Ouz.ACv8bUVyo5Hy2LaD_Z9rSDkH0FSRvXETqW3koK3OjSvB1Vkv4.VaMNcfCItlONqftsQBU1fKjQKrex2Q5bX0hz6CJKtuvWLR35fR5I.SrYYLdST.ipILlnjROB1EqxPZpqHCP_xbRMY2qsZZ3tu4RQZHtncd_D14fNGmz2lWHCuAdlg8Aetz0twUSKgkjm3dQeUQvEftn8h804lz_L4JGYXWPXfSEXuFMaZ18DXelibT2ZmFOGYylXZgv__fd1EycY7cFSyvTHmhUk6.qPx5zieyOMcttEEpXrZxPXuuicUV18SmeeNGjJPNPb1fhPQGJgWSPEqB0ytagOKHZTo455LJyqht6TJPU2hsJJ4LQGdViyiDMCAvxCj2Fa5w8dR_AkIQrNP2uqZP87lQ4CL6UQnrQ9peW5PUUBFSbOdY5tu3z._mmitFRZW6qwWfSKN2ChO7wTrNiOnHz3impbWq6FObZlq4cPz.tIUQ9VPGXYE4hFo1p_qmAzEvS7J5EaPD5eq04yfIRyNkUoTtrZytm.ALgvZgimb47YXXTaFf_LmqRB8n6BucceZe7REHwGUJdLHZMrlAQyI3sFsvz0lw4UbztYdaGcEHGtaiSilEglFbZNwocikszmruki1Dw50wpZp.bvTgLfDUZ_z2Mjz7CQoXfAXsnwEBPXXegw.ZjvX83AyOUOgRokI7IsnPkTtuMV0rrGaaB8MOFjbktv1N4mxuCxG6WgJ5GDlA4uTCsHbk.B6FYhU9aSmALzuuR5gIqrAz2wANNZA2OR_k7g4mYb4zT0UDri1HQv0EUzegBcexNgJDwgT984zmOhqfZIgulYDSeulooUPj6zeJ2A83XkLVWLhfyxrT2gIj.tMMgynBa4RKtCPDUQNemxybKGGBjbgAcqzd4zMHA5.Qp_PLuUngQLEdPnWml1obpvo_FpPgnQSY0LEOUMHBq79qLLCHezw.z1UPXC4MrEyxFLHdToPn9Z7SjPBKsEQDdyanE9yGloCNQm2D1etn0wT65iM00vJi41UrhN8jAHodC9x4y9Jbrg.rw1gn1fA.sfP_hCwf95IlDiagPmmmmkb2JpONSvLighU0JhEWKqQNUk1lO5I7GB5iPhL.R_3YNGjZbCtAfG7_lBzX7hbxoBHgomKmLFXJX0wYVYllIvsveLdGEoJT2itBjwnuYDiG7_7WDhVnnQN1eScA06YbmiEpq6hU3xm0rd71q853cchPLRd7llfYpdQdOzkVwpT3XZE93m1yPQCCg7gY8DIxsModDr1Tdm72dtGRG.QgifsKytIYqLNa5YePjgP59Wngy8vUinPhoAm0pm2nbVSEofNKxBcVU4NLaj6yz2ldjm4dll4.sCnpQjY6rCDU_1x4NjUdFFfQuQcN4rRxnBDaPHnLHSe1m3KeooRgsMQ.owb0ORSuMaEalJNE7VgzUTJmgayRWN8BwvRLnGRRWqWgCYBdb3q9r1NI7XrJ46xCztO28T4iw8A3dyp1QdQUgeiGtkxHmGaYYElJjEEsDDd4FAB4LFUqqmM_6d7mfeUVQcxLlYv1s0_fp1.WLS2fPcbSDaIKEylQ_2WOgWv3Xq7.53B_lJ9U5h_CG4Cv_uxno3moPwlcLFj9_D74UMa_rHrAO75Q5xzcjNty4nwqZlexhyVjnJpy.AOWe0cXLCoho8mytqPOo49b3xFQvPOFXcv2DbKL8uqch8z4R84tlFBOPi_FJpxN8rnNN3W9pIO2mawUCFOaeGjMvF5MpxmDytT3DWpvYD7qeOAmjZZ0QjwvpYYqE_vmCPnsrLDepGQ1.nvvzbzuKklj3mw4c96wbVS_hh99jjhh0J8Ss1OcBBFS5eIMUvVz0WCh6Z.DuXJ5sEKZMsp6aiv5X8tZdXpOxkqnYxQeUiJGbqRnOqdhj4jgTqCi8u3e3Xz11PRLTxHXRWcYMoGBio1Y3YLFcFvMdOmnP31JlfHxMXAOeyX.1x61owboPWKCiaIyR6hucNO5rSunMZWMI6QGMD2a.LLnv_GfmI3ehy0kNPnw.xtuutMnE5viXKBez_LcPQFGI4Z5eCExb6EynW5wzZ0K_LLuOAfkMgOT8WJqWPAKG1f_GCEV5rLRd8yF2UKrHHlwsDsi0V_ExGiAT_1p9rb_bkD1lnZGgUnmLEfMw96OljvZakWnLKvdqmMM8nKIqES_yQ.z.7kuBdcTVbgT0uEjVD2agCLf17Jtx_OplpamS8ALiDlZLxYS285Cxbv7zkiccfwZwR.cYBrahl6t3APjV_n5QfmKMrG7HwxbbEj5v1kK54w1SXln9_ikT1G7y9HSn.Bsb9ySAcuscq76SjVkVB9nS2R6Exmb3nVsYSMQGGrNXTFvAngvs30Ltbgt.EHRpVrz.hVPbrsmJD9.KhNp6K.XvO_.2LBM5lu1R.gDkUs.UdBlmazaNd18Wp3bBXnpH6EWPFEHiEGkp2E6rvDyxnOF.zTvZnhmMs2__X8Idv3y9TaO06Yy9XwX023dAgLJOePvBbNOuNZjF_OpO5pa7wjTIOaStclMBcsBq8EsbEPWtk.fQLg3tb_6b0E1RD3WX6BSWC7LiY9TcC2Kx2ijmNyrpqimcyew1h2T_p15Srma2fG.q3Lv2HHDdIn1G0FlAc1JaIjOezy34pumSxmTkiBGHWmzGTZLMMGoJcAbWtOtT_sQ2ERaZMvUI.i5QNRrcEUGoRrwNgPrO_xyB0ZwRnWixnUVObGuJflEJdYPxcBMaYfSllXGKzOCDqvmaOLxaOy2LXc2BiilLtT5ggWK_sqC6Lk62zr2eKh0xgoL0p_vk4rlgiaUkQZHswyzce669pJYbUPC54qQ9yzr4Qx0hplt6XAw6y08FfoWtVVM0Phj700KQcHMlbE3Bhz0gmZwuJx0cHKYaRHGYy7e_rXayt_gkTv10lcWnelw68qNEdCreyvn43jVSRp9Ui0DvH0FPSjwKqugR5iNvlrUBuMJrYyhnQajcy2euJZ7R9BI5bNNTo_ttmDd7ZjoPP66O7Xmvn0Sa8ciPRL09_sJQ.gOJu75UuiB.LzK2chKsEwsSpEkyHZPh0J5y8snihDjs7STzJIQk4CEBL2q6_WTKy4jG440PAUWw44FkpqKSOaIwwlzs7WcXhW_6mFOTHRha_BRNGAfTMcvfFPBf4IX9KLE4X5kr6q8AtWhwlEjJRMZTJSzWCNknuvV_rQWbDroFiCmCymN8GVMLZhl3RtnmI5xk23e2nvttIhb1rtT8tX33GVjx8apU.AriPXwZTacKccEGKUmxHORV9Ea.OdpHN8PQDSSbOoHFYFpyK2olsr7MZE.Blr2ksXQYcfRf5Or_dAUi0haR1VfrT5I8_d1Ei3hvL0B0zULJcSgqD6_nmS.8s7rWaJaj6pbxWI8zyAvS9OZEsiGPrnuEtbukzsGM6H1UZhV3FRPRUL3HC4wlWWptoL9EbOFv_FlY_.4w0uE0VwqVLqWo1TwiCTdCalYr_r_00m8LqglMOMRQeADSQ_bfPFkv4CnyN_2RJE3khCa71mfjMV9d3GKSw6aQ38Q4z.N38u1_ygKnhDXFOib0fYIlWEQIInAq_o2nXkzSbqc0NAuHPP0iw2525GTbujf.bKy9U3ayV71koE.jym9LVZMtT8QCXuEbQILNn6X_6GwiZmS7rvkeAFieG3_e.HRghEUVXaUHSys4EumxoB9UORR0q6wt4P78p8tIEdPfg7YrCnxON0Y56aj3SwPPgIC6sJz3hNCgsEZ0e3BimCTrnRylRk5AgtLNF7AAQaw_K0_9UV2R1Ij2XLX4dCYzNYcC0uKseOfqr4uPrUtkohyGkNc2GftokWPXJvacN3p7HT0tZWoPwbcVFjXYL4VmfR5SVftrhcWc5RutmU6lWBMijpXnRx2RXpb4o2J0eotOzHKFpX3wPzyLU5Tm3viO07RFtNscMs5empepcxUVYfxcL_MVR7Imc9Ee4AS.e9JOcfcXLNHxhqSWMnqQPZAyDH_eJuIkdXNRwHlRxFAQiSu8xKTIoWbUZREaTcpVjeezHaZ60p7c75cKnLrhCQYiupI698EBl4G106boTqyDuHlSDAdTL510ayIpflqjrbmrMWaNUESbpXmIVTdaHgGkTTHFwmrXlrAwQj1Sby26INujk.O61pGUR0DMrOaTWK5B8HAzB9Kq8NCBv47jDKJA.oByEu6E.HCKi10lgQBx5FkdkiCuDqLnngTF5kx9Jbss69_XYW3vctkP7JqP4cvHVOLtYCDNOF7iMqbY6JtnDtqlW.GyLKr.A72FDYjkUTN_Zr5iQixGIZis_OqoG7HRhTXG2tD1kfbiPj5DGbtTL32ClIvsJ4m50b.wjj.FDJCbu1zaSgjifYs8y9.yd3JQLcAB_yYu8LOCLHj0snj9P9TK82lW8ALy7Hjbct5AR_wnEgMfgOvKCKwHOaATgqA6YNPLqlseESOH_tU4PTMajzUO2vuE6BZ5fOwFZp3HcL_GbvGbwS65IaOnBm2UgFbIceup2F5aOZfAHKdaBqLlRy.WNAnpn5gVKjwi4r4CbdpHENXHyhIzk6VBJiQyIJKSWoeKYm.B08LhRz0XPd4VrVfF9Sq4tv7zWbJMRCOeMXOHbsg55pUMkGJl3peRSygohEkoxn3dz24ZiY8H8BNDr9tEVFKqLHzJDVVvS33rALJH0N3TAnGDD2AclCoiq4y5tQIMctErZnfzR9gK8ZTTNFrwVum_rl_zQFBhxObLZWa1R729y_YAo8aXRuTe6I6nEIwcvlXOpv4D_6Bmiz0JcRmKckqrmJgoF9Q_XtKhOy_UXH51Ku1_BZGTDpe3Xf7vPy.Z9JOSQMNSwlxtFAHsYvulpIVHEzpkCDGk9iJacz7U1kb5MOxAmNo79__woD5yNS2qOLbV7w5OEg1Kluoy9RgTS16f4UQ1Y167bnn4pv.zWM8l0Y1ecsQDWvk7EPpy_UEWC3doww.m2Y7ku4EkPCROf4JePBJsxZ3sGxLTErJZBpZK4LbdVsa7o6CDDGmYszjTYQ9cZQbMsViw_VFSYF._e_aenw.2m0kStHnRx0.LvL1EWpvdeJXPzcOZenlMVPeLqUFNsg4XYi.0Joxf77JWE0dA6PrBpECaeuuf60LbyxanyjNA2Z8LV_Ppntno1fhJNgjJgCmp5P5BgJahhmdn204ht5DzolI8G_t6SWfg5wBN_TIZxf02ttvCWQkKH2Tubz0f1OSmUjttlg0FPCaf_QS2guvrW7jGcvQj5DDQ0IdRsMIRH5SFISeBb6xnr9q_zA3WyzQeMnHtYe_BumGiKE1CA2xhy_9sTrSCk1I7vinC8rjtV5gGuMseDO0Ub4hk.Kakqg27C5OagdTMs0cUU2ZtfHMx7pTZnphDJa7tUDBcbg62oukcynsphaKyw1RXCfSv1mRMlot2gFCzSWq2oNACtRzFJBLbBpspXXAE5Nv_6hDdisRgalxxNL9U__n89LD7GSXaSfHf1UOTbF_W3jdlvJq0s0qdkYfXx0nyHsGjYhF7t4xK7wvRxHHay0uheop_tHadqshjNDcDWgnrL4ZzZA0OAcsnSnAouZMPTOHSiTY1Pvt_vlXZilwP_hIl0z.3mUotd8FbhaF.tLBqu0.Q48en.EAKKEjFZTNfTJ_S0ntTGiqYeNuxEGvBIy49ZdOy5z3ll_a0XegT2WM6UAx1ENIKx4krqVFTOGnOT.QSaNCwFlD66CjVEV51kfjkzshfHZIKm4eSopJuVq5trCPCpCugurV1BBNuTzsd3fFOH.eN98LV6f1gqTSnkRoX6ESqhndzWdVgQTt2h.PCCNnjUVpuahVbT0dXjpinw486Qe0KXjotTF6QV6RQ5ELEZ6kIKNq1JyuMVIB5D7DAgZTnIVrRMnSbKL5vzzKMQpAiiOHyEEvaK0s.rLk51vSzcTWwI.s4kSpqZwH78opgeGKGkN7bnJDAAGQX_xdPAJrn8ZeLYwYzVJX9v4bAXhiWbpeaLUhJmaDv3ZdsQRV4ArPmVUB_aOofGWZ0HKAZL6EKMRLRiERgR5Zvw3ofh9l73Dks60iBqXGzGfxL9cFPmCMfSToZqkd6JUrq3qSihBOUX.F4vX3jOZhuq4rTUgKS1JvMd2MgTASAPFb.TnooZbPrlSvWbel9DiCirRCR1zluZpcLzPQ4nWKp5p8NeIgKNikp4xau80Du7VSIDBdhplJTW6A9sZ3xM3Lh83PWdi.09gqqEI91gKANMrVMu_oMLg7SrIs520xj7Ms8kJpzh1B2gNrMZEN9miIvwC69PlhpYkFEdVg7LEBSi7AkaUWcxObwIwbpTgz.7qNoZF0puXiM0pbBaWKyF1Bvh3XihodbQrFEJlw7ZnVQuXm2Iwchd2r5ragTYZx3K6d_KKXQtEk2FpQn75dQWhEsb5dprfmuDIEuUUouZLRO5ggktPlwJVQnQjZubgwcKe8l82wyq7GYk0wueuEVE77wQHEV7hfvbgqRC9oJbc9qFCfIT0zgs9ETq3mWmutG1JBlYYvOJEVSK54ONQr1w29siAsns4hdYEMgJwFRtaAxNO2vRtv_CPnkwQAna4ELl0KpjG3zRaB5arTj0SN2qlUD3QIiJ4YJvK32jLTbAlhr8hWWIWB.CIRhIwEXkRhSp4fp3mNxbbEHMG3fB8TjMO7pXtdAIq2LtHN60VznIkI32FKI9Sg8cJdenfynD7DL5eeoealBHMPQDULbHqbzQMFEACQrS9uaCV96j4o_r.QaC4RZWzwmp2vJw0696GYJwfH4jPOj4tXUdKyGpNLGQayk5NcsibKjX2HaUpKwFiCZZkFSFMcJ0Vy_AaPDY5R9iMdZuWpfCkIUJdgKeDaYw3xdNeOJHKl7rLUVKAq3NjTI2aG86lRv.RJb36CYBwOnn6MGYCfYzosqiRq8BeKITvszPyzriS8FFRtXbC0Ksz1UlDAnrgsDUtOyAfzPgT30GoQvNlQ6_TZ8zMg_8u5Ztb9VhzG2KrGQqNMr6dqtHWG1_rIZbkkfliVmgGbsgF8nXYmqw.aK8I7V8_eo4DqY36M7HArRJSsf67Hcnufq4FbmQ.QYNvfH8yMgaqUMf81TALXeFLFxUi0i4YiYqtiDLHgjaYPb8bYTKRwXSbrk7FewneGnlc83BTUDhOJEJEc.P93xb_3wsYJcnnuvE55mC8XnuiqpGI1W3a_gbNxIYU.KEGzUeWLvvND1j1Q14h2SlCDYk1S5lcHUPNPzyVrmY3qhwdwUwAACWKRU.4gBS3alLAm6eY0o7ioMOKQD0GVrPZG3MxPmv2K6y9ttnWdlfXj6.dQgjlIJ2ENcIgnw1H6gbJhk0bQiKVm6avSgHDGSwArfdHC9LPvKofDXy_XLSsNhtKUsdjmRspSKq2kT39QRWKywKiycVdwsK9dIto9HF_C4UATPw9bnMFo1ukXAnZtvXQGDNWJvVrDZGjoYMmI8SJ7mmeJns6_.rrFwpPNLybp79r1E9B3d821OIgh_ak_wSPpwdCDeiiFZdwFaO8HuhIw6jPJIiyIvetpcKjbiifsys2QbDqL39NifXevbonxYk8y8FWhPzQlH6EgGoBTj4_GaozUOTITs4AKZtfuGXFbbvunYV2ge2uv.5cdkriEJHeboNrNVUlyipPiDZPMKcYEFhxCngkgq2EU7hXhoiPzlBFNLR3j3zQjyr4_vVfSfKsT5pRegDNNb_o_nq0IBMP5MCqZv8YyKGL1_O2_2M3W_O70btjxWORcKml_eQx0BWF4z7ZENCRwlfWU9OmRb833SQGUPG1DpOFjrwIE24EQqwVFl8ZeifxatIJPRC5.XBn4Ch6jRYsHJN0oUOBD2gpUkLqOm0Wh0n2KpSdAStA6WaRyWJcA_xSQwY8RafIPeVu1gnBMwmtIKUTgyRGrA8vtC93nb4BJAOvgsXMn7GWNBTAHKHOPGJvqkp7aSECvChDGg4QX7YGM6l.f4pglrOyh_4jyEi.wQ4L.QdKgWonDNz8IeAyCPDdn5j5QDAeCdSH8G1eCuMy62Xx8nwlOH2KuwlArcbdtAi_.sAgeO0M.KAfAbZcfw_OykALAIaXfnyli9nIDl_sM22cbWFA71orh8rlXEDu.cBGgPaDZCjP1O8Kv3Wfu2UTWfq8Kldike0vki8bNjcTiYE0kWFpKMRukIkzWPCj4VPHI0SeDfk8Yr9BDHrNjJJvBcF4E4rpNJYG2BJXnMVmi2Mez_i.LawYTkaKmd_ymOQBhunAqoSNP9gSwbkGVha7dPgW7.OhG.4nKvbZpbVf4WtKqiJqIBcPSijkS_4fSFn8M25IhzruxVWUjGlBO6w11bpCbZR2ZWPPlT2ejXmCy.OpvL39COLBBdsD8UMHaDYD9NZ6lEI7iPz3OkXjms_41BBfnTWvepAWpLAWd.oEG6LXzNSooLPYsYd.g_3KCbI8wvwTQGCUe2HdOrkYLmERTFVkqnQ21Yy6oGWCkxRJVqhSWzlmpY4AGqWGbCwRyHWDLR0Kd9l48m_PgymEManzE2XNJfpv5wWTp9jvUHccCTBozw_LniiKrF21uq9Mf6WiCPHqs8BHCS5Ovu0pIUGWlLWdzSZM48kWqL.yRhUwIVc0ZfbbuTb8a8KoY3vQo.JNIDz3ap8aeFyjs5euGQTc19lpiQ.CQxOdrXrV8cCnwmoTKGEvDaw2PlQ69d_vIcEwggK_QERrUKIq8i1qgfYcPseQMJzj2F1ah8GH_TbOZHW2Ed8piQe3iV1gSNmaardXIDDBYaiTk6uu9jNO0NbdYOY7w.jj4bZDwm.lazKT7nBYxpk0SftVjQ6YHws_XcLfO2zRVrBONJFfRittsi5jV3ZbxplENA0H_7nXBOisBcsyTsLChG1VvjpaHs9z_7h_c2pv1_Askd7TinJKy10rnqZDoPhBRwxiLz5Fyq0HBprqDJ1tUHVZyq4KKjPex.7XDhrg__1bz0jko6drY4WJZ53ytdxsGUiaAy_E_aOIreP76BrNkUEkbCPgLv2lxB6JQs1fTeRMyBLCatrQL4FFjfw1fGtvjJLr91Y2RMjjw9Ooh0zXhI1nOtbUmLChn0fck0.NE2ilzlV52KgYLCpVJFjioGMJ5qENrahVqzoL36vZaAtHmqPTyAAl3OA1P_RsEXGZe5W06xl_P6_3kLZRfyObzPcXuj00BdDrzJrNLziNy24VNMwmAK2y5GXo8tGRJfgno2UlJve7MYe44Rr1b0vgsh1hXUkC2qlUY7njEzFpSFUTZFpuRALXIelj4OmBru8swSLtB7cxJUIEozsxM5p9FVkqRXVUHAo05lQanEwW5168O1xavsFtPrTcY_tHXbw2XbhXkNcbd_iiUZk_ufSvxMVoEfFmlsxEU8L55rIADlfK.f31AE3haHwVDyNmNEpALED_QtYaroiG67Xk29Hv8O8zErxeLRIMDygLqFi9t6Q04CtkueuCb30ABQ7zLN4poHSY_vF7uKDQwQqnfPMOvkEdWZfEB0HEmDnYemDIDyDUJaz3_nYq110gxwMYOgHqO0jLNdsBOMuEhsIfqB4UKO1xykVJk7VvcmQcaQoTmQQujcGpqxkDVWXL4G2LWlE2m_YACSP6tSbSCSO.Csb.oWDYdj.U.lBD1BIspebNojaNRbeJZgPyb7leTjwH62qQM7UVX0CRSs5XdaqeMv_Mp9H6CSV7pAQh6RTME0CJ9GXT48QJWIGVXSfyzs9AgDBeOuIj2L24G53aDczGjTdALWxN9olslLPzGcFrrsdDJbs8AD1BE1CzKJQGuYrib6d_smfV8eDzPOkRUI8jemhlbsGFI1KehszkwbE8z5Q02R0hRTcOr_y9CnGWB9C8r6z7Nr6YRNTGr.sx9d4XOTroJIwydpGRqN_d_x8emsy0PzDqTznwHPhZScqSq8SwxAYJVaxNGOULrjfzqveqbnPn7utoewpeoppdCxqeHtgoiorJ9_L_rPehK5pUyhX6Keh9qopGZyOW6zfJjk52gNqC2OVvBOHQiRJqKrBlSV.6B.NBtaAk0Gg2CdSVkCnjdXZybtbjyzbGGtyzRvuODICntgnBYz9tcTJH1pCoLzbctALRLEwDG.kp2m39O8BxzluHevWSYvZAiUAHGEAkhIzL7XMgOvUfwbBfkFKV0wl4FkBW5QB32OD2wOaAHI.gjUk3JwMrxVNInTwHIycmonuWimMc_90IdYtf7A3phav2Y1M8ZttpE4xq9BrjVbEJgas1P8Y4gG.jC0Rnq3aK7LDUivEx5u0MSTs_M_iS6cIJbs2HPCYPkKjPhVLK5tBJOCqxwLBKDt3OmjMZZxbqerXxwmrFq_Cc7QPDCKJSr4iulzpDnD3CW2rch0NCbPAELl1KwCANasv1aC1zdy_.zCYddGVLHdgn.XnqH7KqyNeWqJvywaQkIOBWCRuNrxoBYbP7sf6ly_z6SpypVifsTxT2ZQLB8EV5QsfmEkJTS9d2wLya.K9pAKTNJniwL1hoHuNwc_xGRK1oXNZCNirEHsULrVS5_OfumPaJQM64eicYvdwrAZGhzngkPBwwI935DaxXXoW7qayi0pRLSCH4ZEoXvZ8gLShiVH0jlAelZsMbO2H4JpNr4Yfnrv2ISY9avp1yTkdUsMq_YSSqWajYqll49MnfANiHG52KA4l32y8toWTruUhqFnQHyNUhtudK4UQsLLbYXjVIAyge3eBAoKsGIEg1p_pNtWGeZPKkEF7.dCUfL616gezBKwxARhwfero.7e9Qmo6JXcDiUD8fgvqbHkwZFLQgrjRYgeEeb15QJSBkBe4w0cCCDdQ8nHiR9gYr3yfAxvRkJ5yc2FjIeyUo45yTQRQVnWf11HpUv6SVQedwogeJpI48pFbh2wKKGhRMwGT5acZUzKPEM0i0Gghn7BretX_GKZmWHZd3NKvoxzUlsSpkb4UxYquaMd.S324YTqYFG053aC_NMpEw5QYNRTQrcMRrTtny5FXFPfEjiN1PuhANNxviy3ywrMrr6Md3RQS_AApEnQXaiN67.xE_mtapaLF_n59Bn_CNBLQl7lRjBF7lROmlW.5WX3DO.ekCpcPUJPzmt5JHe6GCfUEzaKNrbP3EQAaTlo.ePzwKoPbBBn2he0DxT0DnPfn22o56MKm9ZrIRnEPEwyv3TX9Lyn0niM9Jd94lH7alE_7nn9lqPrzl0o1OeilCEtO4qvHe4Ae4dVtD39CIiY13WzuTwRP6r6jT3gpiQAVCntGUTiUGmKWl6L2ozMMnrfhJJ2Ehow9abjjiKfkVKaFosDLhjxH1MJoiVoSENSepwsoJs8llyZL.pt4pfSi..8bvTjpSN4AMeHZKbYlTqT849KyUKH5HhC8jsEJ8OwxTQTty06h6jooxJIPsJIYlAx1_Axgjw2ezr56fX6wUivwNDnRHTLjyubdkgsRX8I2jdcP6agvpa2YMoV7IlWa_JNM.xnj_iRz0_EOTxI4ccdHssy3qJPIExIwFJnmsmy1bzldbeh_9VJzO7hKTh2wxtrP9KBnZUM6HXcMo.mJXIDdhbaLGFvdxwbnL8tkaIknqCUdtpTXi4Hgd8L7qhgiTYlZ0KFMtEYHb.tqHWBqyRNQw3YpaQqVKHXm1mVYcQ_CqXKdAEVImY9o5Js4QUQBmcPUmRbztIs9WVMNG0XLaI8oU.VorMK7EAqSZegPCD96qNG5qThXlKAGWSeTmhIJKTAdUbeIdJ_sDepzYhRL8lVY5pBlW0OO8MTNuoh5nrepQ8NBRlg6A7MHrBnqmWtkhit5_RSxIw6.itQO3LhIpuougTBTOsTr6o3aaC3yEYbKjn73c_HtbVPR8vsMA_TRUku0oWWo5iP0n_B7GRFboiXb3qzPQfET0fPMC_X.Pv3jbM.cBvetLmaw0pQfufUUdp2KpcYgkhLygRWan4iNr1wa1DDYVeKXeF8Gvi1acDLXLMEkFr7yOnI.UuSqcnJ0p8nrGdk7WpWICL0YGmvb6j3QevPRrmI98oJPfxLSotWvKXdW3QSVinnxhG0xXs4J29idllx6srq0j93hMEcLdIvREzk6utKXPxGvWMOF5af_adnNvFgxQ6BSni8fuI06XbOhPj6UGY4MLzlB5epfEjZxUOlZuIh8UvoX22e1lA_hsQn1qJIa6SoXareDPLrHDmINu0qUoRrP4yAhppGcwWrQ_if2GdhNs9nnl5vJWMO7i9RNI5Tx.tqYr19wSflOrbgAmxbJ6T72PTYMkNtY0oIi1XQaCul9TirNNAg5PDRhHUOeFd4LGnq2PR7NF2uCez.5EMrjXDUvf3oxeA9D3CHLMTuVT8ylKa1QdjVWx1qFU4loXJKFPpkUkxt4OXt00ue4iSt9DNsCdWw7brNTKFWu8nndtIUTMVp6BxtKCAkZvYPcM5r64UgBYsBMsXq_RquOxaegzi14WN7iM6Ljq.OAGf5cKRxyuPcKMts5nv6Zg1h9yJFfY4ucmCTwax3rtUsKpC0A4BMN7wzhvgQt.JdmDROqqsQlju3U8ehHN3f1vYdpeaXeqWJhOD9Y4NsWiINmkix3gplkTUoQmKn4P7psL3squcSJ91y64mkQgT2.Hy.hwGJGeGXrWQgj2qhu1geydp0kCud5ftgJnNF1xcD8fL6uzCsdlzvmTSrVA3QvQLLn5Dd0WqtUssCkfcOFDHjxswmCPA3lXwlvtHMN2_pdf4Lv3vT3j0HEDTIEtf9VJayuBjzZdAA2DtgUqZqRnjkKhOONvZUUfXjjoUqOjoGVPHuRJfNI5B7c6Gg_FH8VVL0.FSfyhKcw79QdMN178Jhd_ALQ__jbLRQuXk._Tldoc3DegmQPKl6ktK1ugrKJjQj2uWbTLUVMZ2IWnZZXESlW_L4mh3pvXALMMs4doHr8TmMWb2XJjSl_LqyGu24DNUFh1TfemU4X9KKQalEM8twJz.e5NfNV9rqWoEeAAwpOdJNSKGThGSiG56SeuVDZpSigH6ubkuYxRKcZCiZUqDf5JNT7XD7z9pyoet3M9os9Iq2mjEyo9soRmnFkaPTLuwv58nZ_C_Y.McRMUuwO9e8YRRFx3wql3YHW5SFihIuXmfNss3E7hThFWA0do0ac.vTmhLJpZEO4E9I7beGvT6_bs5Dp2F7QZnYtYKyrJDpqCGSe49bisMU7ImaPKkNHCiSCx1mgopNXSgZOfKDFRkUOrqLF3gliedO6b75OmtmHau9Yodn7g.S7CYRUtGFxx_ReTyxF6odm8J1IZmVoW1bW4SDkiA6ivHO5Zrop2Txrb71UemU5sHC0.Rhf1eTlv_5QeobfWYJDbozV2LD1fYN3ZrMT9A2cwpPWvANWCNb2CEPDmLD8L7id4Tjtl1b0pR6xYHTWAWA8mB0CJoif1O7v7u.ti7KbJxdlybCTvFyQ_vYNbmhcl8pfxFdc3v35w4wEsRhjqwIqVNrMqt6TRC1ILZpjGwGukebDqWPMnE1.fKvF5qJr1txR2dd41BjElnyBLjYdB43nUcvVquLcZ45SlowvBf1Tkb99k00ja5AfNPOdhujw0U985su7t.F.LnA.03F."
                    UNWRAP
                    [ SWAP bucketizer.last 0 10 m 0 ] BUCKETIZE
                    CLONE [ SWAP mapper.tolong 0 0 0 ] MAP`
    },
    {
      type: 'plot',
      description: ` The plot element below has focus false. So, keyboard events must not be stolen. Place the focus in
                    the text area then test all the shortcut a n / s j k t arrowUp arrowdown space (gts selector, regexp
                    selector).
                    No shortcut should ever trigger an action. The 'r' key should trigger a refresh of every tiles
                    (catch at document level).`,
      unit: '',
      warpscript: `NEWGTS 'divLEFT' RENAME
                        -10 10
                        <%
                        's' STORE
                        NOW $s s + $s 0.0 NaN $s 2 % 0 == ADDVALUE
                        %>
                        FOR

                        NEWGTS 'divLEFTstringone' RENAME
                        -10 10
                        <%
                        's' STORE
                        NOW $s s + 0.0 $s NaN
                        $s ADDVALUE

                        %>
                        FOR

                        NEWGTS 'divLEFT 2h ago' RENAME
                        NOW 2 h - NaN NaN NaN 12 ADDVALUE
                        NOW 2 h + NaN NaN NaN -12 ADDVALUE`
    },
    {
      type: 'plot',
      description: ` The plot element below has focus false. So, keyboard events must not be stolen. Place the focus in
                    the text area then test all the shortcut a n / s j k t arrowUp arrowdown space (gts selector, regexp
                    selector).
                    No shortcut should ever trigger an action. The 'r' key should trigger a refresh of every tiles
                    (catch at document level).`,
      unit: '',
      warpscript: `NEWGTS 'divRIGHT' RENAME
                        -10 10
                        <%
                        's' STORE
                        NOW $s s + $s 0.0 NaN $s 2 % 0 == ADDVALUE
                        %>
                        FOR

                        NEWGTS 'divRIGHTstringone' RENAME
                        -10 10
                        <%
                        's' STORE
                        NOW $s s + 0.0 $s NaN
                        $s ADDVALUE

                        %>
                        FOR

                        NEWGTS 'divRIGHT 2h ago' RENAME
                        NOW 2 h - NaN NaN NaN -12 ADDVALUE
                        NOW 2 h + NaN NaN NaN 12 ADDVALUE`
    }
    ];
  constructor(private route: ActivatedRoute, private router: Router, private settingsService: SettingsService) {
    settingsService.settingsAdded$.subscribe(evt => {
      this.theme = evt.settings.theme;
      if (evt.settings.theme === 'dark') {
        this.options.mapType = 'DEFAULT';
        this.options.gridLineColor = '#ffffff';
      } else {
        this.options.mapType = 'DEFAULT';
        this.options.gridLineColor = '#000000';
      }
      this.options = {...this.options};
    });
  }

  ngOnInit() {
  }

  manageTheme() {
    return {
      'text-white': (this.theme === 'dark'),
      'bg-light': this.theme === 'light',
      'bg-dark': this.theme === 'dark'
    };
  }
}
