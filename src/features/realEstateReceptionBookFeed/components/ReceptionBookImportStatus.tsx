import {Alert, AlertTitle, Box} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { type IRealEstateReceptionBookImportStatusObject } from "../types";


interface Props{
    importStatuses: IRealEstateReceptionBookImportStatusObject[]
}

const ReceptionBookImportStatus:  React.FC<Props> = ({ importStatuses }) => {
    return(
        <Alert severity="info">
            <AlertTitle sx={{fontWeight: 'bold'}}>登記受付帳お知らせ</AlertTitle>
            <Box style={{maxHeight: '6.5em', overflow: 'auto'}}>
                <Grid container spacing={2}>
                    {importStatuses.map(item => (
                        <Grid item key={item.prefecturesId}>
                            ● {item.importDate}<Typography sx={{fontWeight: 'bold', mx: .5 }} display="inline">{item.prefecturesName}{item.legalAffairsBureauRequestMonth}</Typography>公開
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Alert>
    )
}

export { ReceptionBookImportStatus }