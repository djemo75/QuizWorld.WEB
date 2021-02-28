import { Chip, Divider, Grid, Paper } from "@material-ui/core";
import {
  CheckCircleOutlined,
  EmojiPeopleOutlined,
  LiveHelpOutlined,
} from "@material-ui/icons";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { PUBLIC_TEST } from "../../../constants/tests";
import { TestContext } from "../../../context/TestContext";
import { STATIC_ROUTES } from "../../../routes";
import { StatisticItem } from "../../../shared/components/StatisticItem";

export const TestStatisticsAndSettings = ({ test }) => {
  const history = useHistory();
  const { statistic, statisticLoading } = useContext(TestContext);

  return (
    <>
      <Paper className="card-statistics-and-settings" elevation={1}>
        <div className="card-content">
          <div className="title">
            Visibility:
            <Chip
              variant="outlined"
              label={test.visibility}
              color={test.visibility === PUBLIC_TEST ? "primary" : "secondary"}
              size="small"
              style={{
                marginLeft: "10px",
                minWidth: "60px",
                textTransform: "capitalize",
              }}
            />
          </div>
          <Divider style={{ margin: "10px 0 8px 0" }} />
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <StatisticItem
                icon={<LiveHelpOutlined />}
                text="Total questions"
                count={statistic?.totalQuestions}
                loading={statisticLoading}
              />
            </Grid>
            <Grid item xs={4}>
              <StatisticItem
                icon={<EmojiPeopleOutlined />}
                text="Total participants"
                count={statistic?.totalParticipants}
                loading={statisticLoading}
                onClick={() =>
                  history.push(
                    STATIC_ROUTES.testParticipants.replace(":id", test.id),
                  )
                }
              />
            </Grid>
            <Grid item xs={4}>
              <StatisticItem
                icon={<CheckCircleOutlined />}
                text="Total results"
                count={statistic?.totalResults}
                loading={statisticLoading}
                onClick={() =>
                  history.push(
                    STATIC_ROUTES.testResults.replace(":id", test.id),
                  )
                }
              />
            </Grid>
          </Grid>
        </div>
      </Paper>
      <style jsx>{`
        :global(.card-statistics-and-settings) {
          height: 100%;
        }
        :global(.card-statistics-and-settings .card-content) {
          padding: 16px;
        }
        .card-content .title {
          display: flex;
          align-items: center;
        }
        :global(.card-statistics-and-settings .MuiDivider-root) {
          margin: 8px 0;
        }
      `}</style>
    </>
  );
};
